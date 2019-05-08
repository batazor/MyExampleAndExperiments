package accounts

import (
	"context"
	"fmt"
	"github.com/batazor/highloadcup/pkg/mongodb"
	"github.com/mongodb/mongo-go-driver/bson"
	"github.com/mongodb/mongo-go-driver/mongo"
	"github.com/mongodb/mongo-go-driver/mongo/options"
	"go.uber.org/zap"
	"strconv"
	"time"
)

var (
	logger  *zap.Logger
	err     error
	session *mongo.Client
)

func init() {
	logger, err = zap.NewProduction()
	if err != nil {
		fmt.Print("{\"level\":\"error\",\"msg\":\"Error init logger\"}")
	}

	// Connect to DB
	session = mongodb.Connect()
}

func Add(account Account) (*mongo.InsertOneResult, error) {
	col := session.Database("highloadcup").Collection("accounts")

	return col.InsertOne(nil, account)
}

func Update(accountId string, account Account) (*mongo.UpdateResult, error) {
	col := session.Database("highloadcup").Collection("accounts")

	filter := bson.M{"_id": accountId}
	return col.UpdateOne(nil, filter, account)
}

func AddLikes(likes PushLikes) error {
	col := session.Database("highloadcup").Collection("accounts")

	var account Account
	for _, item := range likes.Likes {
		filter := bson.M{"_id": strconv.Itoa(int(item.Liker))}

		_, err = col.UpdateOne(nil, filter, account)
		if err != nil {
			return err
		}
	}

	return nil
}

func GetAccountsByFilter(filters map[string]interface{}) (AccountList, error) {
	accountList := AccountList{}

	// Options
	limit, _ := strconv.ParseInt(filters["limit"].(string), 10, 64)
	opts := options.FindOptions{
		Limit: &limit,
	}

	// Filter
	filterCmd := bson.D{}
	for k := range filters {
		if k != "limit" {
			t := bson.D{{k, filters[k]}}
			filterCmd = append(filterCmd, t[0])
		}
	}

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	col := session.Database("highloadcup").Collection("accounts")
	cur, err := col.Find(ctx, filterCmd, &opts)
	defer cur.Close(ctx)

	if err != nil {
		fmt.Println("err", err.Error())
		return accountList, err
	}

	for cur.Next(ctx) {
		result := Account{}
		err := cur.Decode(&result)
		accountList.Accounts = append(accountList.Accounts, result)

		if err != nil {
			fmt.Println("err", err.Error())
			return accountList, err
		}
	}

	if err != nil {
		return accountList, err
	}

	if err := cur.Err(); err != nil {
		return accountList, err
	}

	return accountList, nil
}
