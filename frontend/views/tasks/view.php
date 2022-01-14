<?php

use App\Service\DataFormatter;
use \yii\helpers\Url;
use \frontend\models\Task;
use \frontend\models\Respond;

/**
 * @var \frontend\models\Task $task
 * @var \frontend\models\forms\TaskSearchForm $model
 * @var \App\business\Task $actions
 */

?>
<section class="content-view">
    <div class="content-view__card">
        <div class="content-view__card-wrapper">
            <div class="content-view__header">
                <div class="content-view__headline">
                    <h1><?= $task->title; ?></h1>
                    <span>Размещено в категории
                                    <a href="<?= Url::to([
                                        '/tasks/index', "{$model->formName()}"=>
                                            ['categories' => [$task->category->id],
                                                'noExecutor' => false
                                            ]
                                    ]); ?>" class="link-regular"><?= $task->category->name; ?></a>
                                    <?= DataFormatter::getRelativeTime($task->creation_date); ?></span>
                </div>
                <b class="new-task__price new-task__price--clean content-view-price"><?=$task->budget; ?><b> ₽</b></b>
                <div class="new-task__icon new-task__icon--<?= $task->category->icon; ?> content-view-icon"></div>
            </div>
            <div class="content-view__description">
                <h3 class="content-view__h3">Общее описание</h3>
                <p>
                    <?= $task->description ;?>
                </p>
            </div>
            <div class="content-view__attach">
                <h3 class="content-view__h3">Вложения</h3>
                <?php foreach($task->taskFiles as $file): ?>
                    <a href="<?= Url::to($file['url']); ?>"><?= $file['name']; ?></a>
                <?php endforeach; ?>
            </div>
            <div class="content-view__location">
                <h3 class="content-view__h3">Расположение</h3>
                <div class="content-view__location-wrapper">
                    <div class="content-view__map">
                        <a href="#"><img src="/img/map.jpg" width="361" height="292"
                                         alt="Москва, Новый арбат, 23 к. 1"></a>
                    </div>
                    <div class="content-view__address">
                        <span class="address__town"><?=$task->city->name ?? 'Город не определен'; ?></span><br>
                        <span><?= $task->address ?? 'Удаленная работа'; ?></span>
                        <p>Вход под арку, код домофона 1122</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-view__action-buttons">
            <?php foreach ($actions as $action): ?>
                <button class="button button__big-color <?= $action->getButtonColorClass(); ?>-button open-modal"
                        type="button" data-for="<?= $action->getActionCode(); ?>-form"><?=$action->getActionTitle(); ?>
                </button>
            <?php endforeach; ?>
        </div>
    </div>

<?php if ($task->getResponds()->count()): ?>
    <?php if (Yii::$app->user->id === $task->client->id || $task->isVolunteer(Yii::$app->user->id)): ?>
    <div class="content-view__feedback">
        <h2>Отклики <span>(<?= count($task->responds)?>)</span></h2>
        <div class="content-view__feedback-wrapper">

            <?php  foreach ($task->responds as $message): ?>
            <?php if (Yii::$app->user->id === $task->client->id || Yii::$app->user->id === $message->volunteer->id): ?>
            <div class="content-view__feedback-card">
                <div class="feedback-card__top">
                    <a href="<?= Url::to("/user/view/{$message->volunteer->id}"); ?>"><img src="<?= $message->volunteer->avatar; ?>" width="55" height="55"></a>
                    <div class="feedback-card__top--name">
                        <p><a href="<?= Url::to("/user/view/{$message->volunteer->id}"); ?>" class="link-regular"><?= $message->volunteer->name; ?></a></p>
                        <span></span><span></span><span></span><span></span><span class="star-disabled"></span>
                        <b><?= $message->volunteer->rating; ?></b>
                    </div>
                    <span class="new-task__time"><?= DataFormatter::getRelativeTime($message->creation_date); ?></span>
                </div>
                <div class="feedback-card__content">
                    <p>
                        <?= $message->description; ?>
                    </p>
                    <span><?= $message->rate; ?>&nbsp;₽</span>
                </div>
                <?php if (Yii::$app->user->id === $task->client->id && $task->status == Task::STATUS_NEW && $message->status == Respond::STATUS_NEW): ?>
                <div class="feedback-card__actions">
                    <a href="<?= Url::to(["/task/confirm/{$task->id}/{$message->id}"]); ?>" class="button__small-color response-button button"
                       type="button">Подтвердить</a>
                    <a href="<?= Url::to(["/task/deny/{$task->id}/{$message->id}"]); ?>" class="button__small-color refusal-button button"
                       type="button">Отказать</a>
                </div>
                <?php endif; ?>
            </div>
            <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>
    <?php endif; ?>
    <?php endif; ?>
</section>
<section class="connect-desk">
    <div class="connect-desk__profile-mini">
        <div class="profile-mini__wrapper">
            <h3>Заказчик</h3>
            <div class="profile-mini__top">
                <img src="<?= $task->client->avatar; ?>" width="62" height="62" alt="Аватар заказчика">
                <div class="profile-mini__name five-stars__rate">
                    <p><?= $task->client->name; ?></p>
                </div>
            </div>
            <p class="info-customer"><span><?= DataFormatter::declensionOfNouns(count($task->client->clientTasks), ['задание', 'задания', 'заданий']); ?></span><span class="last-">2 года на сайте</span></p>
            <a href="#" class="link-regular">Смотреть профиль</a>
        </div>
    </div>
    <div id="chat-container">
        <!--                    добавьте сюда атрибут task с указанием в нем id текущего задания-->
        <chat class="connect-desk__chat" task="<?= $task->id; ?>"></chat>
    </div>
</section>
