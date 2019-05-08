package accounts

// начало и конец премиального периода в системе (когда пользователям очень хотелось найти "вторую половинку" и они делали денежный вклад). В json это поле представлено вложенным объектом с полями start и finish, где записаны timestamp-ы с нижней границей 01.01.2018.
type Premium struct {
	start  int
	finish int
}

// массив известных симпатий пользователя, возможно пустой. Все симпатии идут вразнобой и каждая представляет собой объект
type Like struct {
	TS int `json:"ts"` // время, то есть timestamp, когда симпатия была записана в систему.
	ID int `json:"id"` // идентификатор другого аккаунта, к которому симпатия. Аккаунт по id в исходных данных всегда существует. В данных может быть несколько лайков с одним и тем же id.
}

type Account struct {
	ID            int32  `json:"id" bson:"id,omitempty"`           // уникальный внешний идентификатор пользователя. Устанавливается тестирующей системой и используется затем, для проверки ответов сервера. Тип - 32-разрядное целое число.
	FirstName     string `json:"fname" bson:"fname,omitempty"`     // имя. Тип - unicode-строки длиной до 50 символов. Поля опциональны и могут отсутствовать в конкретной записи.
	SecondaryName string `json:"sname" bson:"sname,omitempty"`     // фамилия. Тип - unicode-строки длиной до 50 символов. Поля опциональны и могут отсутствовать в конкретной записи.
	Email         string `json:"email" bson:"email,omitempty"`     // адрес электронной почты пользователя. Тип - unicode-строка длиной до 100 символов. Гарантируется уникальность.
	Sex           string `json:"sex" bson:"sex,omitempty"`         // unicode-строка "m" означает мужской пол, а "f" - женский.
	Phone         string `json:"phone" bson:"phone,omitempty"`     // номер мобильного телефона. Тип - unicode-строка длиной до 16 символов. Поле является опциональным, но для указанных значений гарантируется уникальность. Заполняется довольно редко.
	Birth         int    `json:"birth" bson:"birth,omitempty"`     // дата рождения UTC. Ограничено снизу 01.01.1950 и сверху 01.01.2005-ым.
	City          string `json:"city" bson:"city,omitempty"`       // город проживания. Тип - unicode-строка длиной до 50 символов. Поле опционально и указывается редко. Каждый город расположен в определённой стране.
	Country       string `json:"country" bson:"country,omitempty"` // страна проживания. Тип - unicode-строка длиной до 50 символов. Поле опционально.

	// My favorit
	Joined    int      `json:"joined" bson:"joined,omitempty"`       // дата регистрации в системе. Тип - timestamp с ограничениями: снизу 01.01.2011, сверху 01.01.2018.
	Status    string   `json:"status" bson:"status,omitempty"`       // текущий статус пользователя в системе. Тип - одна строка из следующих вариантов: "свободны", "заняты", "всё сложно". Не обращайте внимание на странные окончания :)
	Interests []string `json:"interests" bson:"interests,omitempty"` // интересы пользователя в обычной жизни. Тип - массив unicode-строк, возможно пустой. Строки не превышают по длине 100 символов.
	Premium   Premium  `json:"premium" bson:"premium,omitempty"`
	Likes     []Like   `json:"likes" bson:"likes,omitempty"`
}

type AccountList struct {
	Accounts []Account `json:"accounts" bson:"accounts,omitempty"`
}

type Likes struct {
	Likee int32 `json:"likee"` // id того, кто симпатичен;
	Liker int32 `json:"liker"` // id того, кто выставил отметку симпатии;
	TS    int   `json:"ts"`    // время, то есть timestamp, когда симпатия была записана в систему.
}

type PushLikes struct {
	Likes []Likes `json:"likes"`
}
