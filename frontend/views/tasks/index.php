<?php
/**
 * @var $this \yii\base\View
 */

?>

<section class="new-task">
    <div class="new-task__wrapper">
        <h1>Новые задания</h1>
        <?php foreach ($newTasks as $newTask): ?>
        <div class="new-task__card">
            <div class="new-task__title">
                <a href="view.html" class="link-regular"><h2><?= $newTask->title; ?></h2></a>
                <a class="new-task__type link-regular" href="#"><p><?= $newTask->category->name; ?></p></a>
            </div>
            <div class="new-task__icon new-task__icon--<?= $newTask->category->icon; ?>"></div>
            <p class="new-task_description">
                <?= $newTask->description; ?>
            </p>
            <b class="new-task__price new-task__price--<?= $newTask->category->icon; ?>"><?= $newTask->budget;?><b> ₽</b></b>
            <p class="new-task__place">Санкт-Петербург, Центральный район</p>
            <span class="new-task__time"><?= $newTask->getRelativeTime($newTask->creation_date); ?></span>
        </div>
        <?php endforeach; ?>
    </div>
    <div class="new-task__pagination">
        <ul class="new-task__pagination-list">
            <li class="pagination__item"><a href="#"></a></li>
            <li class="pagination__item pagination__item--current">
                <a>1</a></li>
            <li class="pagination__item"><a href="#">2</a></li>
            <li class="pagination__item"><a href="#">3</a></li>
            <li class="pagination__item"><a href="#"></a></li>
        </ul>
    </div>
</section>

<?= Yii::$app->controller->renderPartial('/tasks/search-task', ['model' => $model]); ?>



