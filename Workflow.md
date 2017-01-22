# Workflow

<!-- ![Workflow](./Workflow.png) -->

### Stages of Software Development [Docs](https://about.gitlab.com/2016/10/25/gitlab-workflow-an-overview/)

![Workflow](./images/idea-to-production-10-steps.png)

The natural course of the software development process passes through 10 major steps;
GitLab has built solutions for all of them:

1. **IDEA:** Every new proposal starts with an idea, which usually come up in a chat. For this stage, GitLab integrates with Mattermost.
1. **ISSUE:** The most effective way to discuss an idea is creating an issue for it. Your team and your collaborators can help you to polish and improve it in the issue tracker.
1. **PLAN:** Once the discussion comes to an agreement, it's time to code. But wait! First, we need to prioritize and organize our workflow. For this, we can use the Issue Board.
1. **CODE:** Now we're ready to write our code, once we have everything organized.
1. **COMMIT:** Once we're happy with our draft, we can commit our code to a feature-branch with version control.
1. **TEST:** With GitLab CI, we can run our scripts to build and test our application.
1. **REVIEW:** Once our script works and our tests and builds succeeds, we are ready to get our code reviewed and approved.
1. **STAGING:** Now it's time to deploy our code to a staging environment to check if everything worked as we were expecting or if we still need adjustments.
1. **PRODUCTION:** When we have everything working as it should, it's time to deploy to our production environment!
1. **FEEDBACK:** Now it's time to look back and check what stage of our work needs improvement. We use Cycle Analytics for feedback on the time we spent on key stages of our process.
