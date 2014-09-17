User.delete_all

User.create(
  name: "Ivanov",
  email: "ivan@gmail.com",
  location: "ru",
  description: "Лентяй, лежебока"
)

User.create(
  name: "Petr",
  email: "petr.uk@mail.ru",
  location: "ua",
  description: "Кобачки, лампочка, европа..."
)

Post.delete_all

Post.create(
  content: "Новость, новость, новость, новость",
  user_id: 1
)

Post.create(
  content: "Сенсация, сенсация, сенсация",
  user_id: 1
)
