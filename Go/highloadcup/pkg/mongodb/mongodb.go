package mongodb

import (
	"context"
	"fmt"
	"github.com/mongodb/mongo-go-driver/mongo"
	"go.uber.org/zap"
	"time"
)

var (
	logger *zap.Logger
	err    error
)

func init() {
	logger, err = zap.NewProduction()
	if err != nil {
		fmt.Print("{\"level\":\"error\",\"msg\":\"Error init logger\"}")
	}
}

func Connect() *mongo.Client {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(ctx, "mongodb://localhost:27017")
	if err != nil {
		logger.Error(err.Error())
		return nil
	}

	logger.Info("Success connect to MongoDB")

	return client
}
