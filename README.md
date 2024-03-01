
# Pro Manage => Project Task Manager


This is the final evaluation project by cuvette
![Logo](./client/public/Assets/logo.svg)


## Authors

- [@AJIT-KUMAR-PANDIT](https://www.github.com/AJIT-KUMAR-PANDIT)


## Deployment

- [Deployed Link](https://promanage.vercel.app)


## Screenshots

### Register

![App Screenshot](./ReadMeAssets/register.png)

### Dashboard

![App Screenshot](./ReadMeAssets/bashboard.png)

### Analytics

![App Screenshot](./ReadMeAssets/analytics.png)

### Settings

![App Screenshot](./ReadMeAssets/settings.png)

### Public

![App Screenshot](./ReadMeAssets/public.png)

Checklist

1. User can login and register to the application, only logged in users can create tasks

2. User can create tasks, with properties like priority, due deadline(optional), task list and user can also share their task with other users. Shared tasks can be publicly accessed with read-only access

3. User can update their name or password from settings page, for password you will have to enter both old and new password

4. Users can view the analytics section for all the tasks, analytics is data for all the tasks created so far on the platform

5. User can move any card to different states ie. backlog, todo, in-progress and done manually

6. If a user misses the deadline then its due date will turn red on todo/in-progress/backlog sections

7. If a task is marked as done then the Due Date color on card will change to green, and I move back to todo/in progress/backlog then again it will be checked that if due date is passed or not, if due date is passed then red color, else gray color

8. User can delete a task

9. User can edit a task

10. User can filter the tasks by today, this week and month, by default this week filter will be selected

11. Make sure to add toast messages as per your need

12. While creating tasks, fields that are mandatory ie. title, priority, checklist and due date is optional

13. The task title shown on board page will be clipped with ... if it crosses a certain character limit(flexible to choose the limit as per your need) and If someone hovers on title then, we can show the full title with a tooltip or title attribute of html element

14. All the mandatory fields are marked with * (red color)

15. For filter this week means: 7days from today, this month: 30days from today

