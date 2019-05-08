package gitlab

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/xanzy/go-gitlab"
	"reflect"
	"regexp"
	"strconv"
	"strings"
)

var (
	totalIssue = prometheus.NewGaugeVec(prometheus.GaugeOpts{
		Name: "gitlab_issue_total",
		Help: "The total number of issue",
	}, []string{"assigneeNickname", "milestoune"})
)

func init() {
	prometheus.MustRegister(totalIssue)
}

func issueList() {
	searchOpt := gitlab.ListIssuesOptions{}

	allIssue := []*gitlab.Issue{}

	for {
		issues, response, err := GitLabSession.Issues.ListIssues(&searchOpt)
		if err != nil {
			logger.Error(err.Error())
			return
		}

		for _, item := range issues {
			allIssue = append(allIssue, item)
		}

		// Exit the loop when we've seen all pages.
		if searchOpt.Page >= response.TotalPages {
			break
		}

		// Update the page number to get the next page.
		searchOpt.Page = response.NextPage
	}

	// Group issue by assigneeId
	assigneesUsername := make(map[string][]*gitlab.Issue)
	for _, item := range allIssue {
		for _, assignee := range item.Assignees {
			assigneesUsername[assignee.Username] = append(assigneesUsername[assignee.Username], item)
		}
	}

	// get all issue by AssigneeId
	keysAssigneeUsername := reflect.ValueOf(assigneesUsername).MapKeys()
	for _, keyAssigneeUsername := range keysAssigneeUsername {
		// Group issue by milestoune
		milestounesId := make(map[string][]*gitlab.Issue)
		for _, item := range assigneesUsername[keyAssigneeUsername.String()] {
			if item.Milestone != nil {
				milestounesId[item.Milestone.Title] = append(milestounesId[item.Milestone.Title], item)
			}
		}

		// get all issue by milestoune
		keysMilestounesId := reflect.ValueOf(milestounesId).MapKeys()
		for _, keyMilestounesId := range keysMilestounesId {
			milestoune := milestounesId[keyMilestounesId.String()]
			milestouneTitle := milestoune[0].Milestone.Title
			// e.g: gitlab_user_kpi{userId="7",milestoune="Sprint 2"} 50

			// regxp - weight each issue
			// e.g: gitlab_user_kpi{userId="7",milestoune="3"} 15
			weightIssue := float64(0)
			for _, issue := range milestoune {
				r, _ := regexp.Compile(GITLAB_ISSUE_WEIGHT_REGEX)
				s := r.FindString(issue.Title)
				s = strings.TrimPrefix(s, "[")
				s = strings.TrimSuffix(s, "]")
				weight, _ := strconv.ParseFloat(s, 64)
				if weight > 0 {
					weightIssue += weight
				} else {
					weightIssue += 1
				}
			}

			// export sum weight
			totalIssue.WithLabelValues(keyAssigneeUsername.String(), milestouneTitle).Set(weightIssue)
		}
	}
}
