# Проект: Место

Ссылки на сайт:https://vlgrigoryan.github.io/mesto-project/

Адаптивный сайта для мобильные устройства и планшеты

html/css

для разработки сайта было создано нижеперечисленное:

Header
Profile секция - служит для входа пользователя на сайт. Содержит данные пользователя - фото, ИФО, вид деятельности и тд. Кроме того в этой части созданы два инструмента (button); один - для добавления постов, другой - для редактирования профиля.
Element секция (grid) - отображает публикации пользователя. Создан Button Like/Dislike. Имеется пространство, созданное для наименования публикации.
Profile Editor Section - модальное окно для редактированиия данных пользователя, которое открывается с помощью Profile Edit Button из секции Profile. Содержит Form, fieldset, Input и два инструмента закрытия окна и сохранения данных
Footer

Написан код JavaScript для  функциональности проекта Место, который позволяет пользователям редактировать информацию профиля, добавлять новые публикации и просматривать их во всплывающем окне.

Код определяет несколько констант, в том числе:
1. контейнер профиля,
2. редактор профиля,
3. редактор публикации,
4. всплывающее окно.

Код также определяет несколько функций, которые обрабатывают взаимодействия с пользователем:
1. открытие и закрытие редактора профиля,
2. Изменение имени пользователя и деятельности
3. добавление новых публикаций,
4. отображение изображений во всплывающем окне.
5. удаление добавленных публикаций
6. добавление лайков на публикацию

Написано несколько addEventListener, которые прослушивают действия пользователя:
нажатие кнопки редактирования профиля,
сохранение информации профиля,
добавление новых публикации,
закрытие всплывающего окна.
