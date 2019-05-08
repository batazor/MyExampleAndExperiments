package gitlab

import (
	"fmt"
	"github.com/batazor/gitlab-exporter/pkg/utils"
	"github.com/xanzy/go-gitlab"
	"go.uber.org/zap"
	"time"
)

var (
	logger *zap.Logger
	err    error

	GitLabSession *gitlab.Client

	// ENV
	GITLAB_ENDPOINT           = utils.Getenv("GITLAB_ENDPOINT", "https://gitlab.com")
	GITLAB_USER               = utils.Getenv("GITLAB_USER", "GITLAB_USER")
	GITLAB_PASSWORD           = utils.Getenv("GITLAB_PASSWORD", "GITLAB_PASSWORD")
	GITLAB_AUTH_TOKEN         = utils.Getenv("GITLAB_AUTH_TOKEN", "")
	GITLAB_ISSUE_WEIGHT_REGEX = utils.Getenv("GITLAB_ISSUE_WEIGHT_REGEX", "([\\[])([0-9])*\\]")
)

func init() {
	logger, err = zap.NewProduction()
	if err != nil {
		fmt.Print("{\"level\":\"error\",\"msg\":\"Error init logger\"}")
	}
}

func Run() {
	if len(GITLAB_AUTH_TOKEN) > 0 {
		GitLabSession = gitlab.NewClient(nil, GITLAB_AUTH_TOKEN)
		err = GitLabSession.SetBaseURL(GITLAB_ENDPOINT)
	} else {
		GitLabSession, err = gitlab.NewBasicAuthClient(nil, GITLAB_ENDPOINT, GITLAB_USER, GITLAB_PASSWORD)
	}

	if err != nil {
		logger.Error(err.Error())
		return
	}

	logger.Info("Run gitlab module")

	// Run metrics
	go func() {
		for {
			go issueList()

			time.Sleep(10 * time.Minute)
			logger.Info("Update metrics: gitlab")
		}
	}()
}
