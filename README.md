# Steps to run

* Have a look at ```.env.example``` to see the environment variables needed to run the backend project locally - note that the base trello API url (env variable `TRELLO_API_URL`) would be in format ```https://api.trello.com``` i.e. no sub-paths
* ```npm i && npm run dev```
* Server will be listening on port 3001 on 127.0.0.1 - the frontend will be calling it at this location and port.



# Notes on thought patterns and decisions made

* I really don't have a specific reason for using ```Koa``` as opposed to Express JS except for the fact that I've worked with Koa a bit more.  I think they pretty much achieve the same things
*  This is quite a small project, so abstractions to the degree to which I've done may appear unnecessary, but wanted to illustrate how I would generally seperate concerns.  If there was a database involved, I would've added this to context at the root of the app, and had a db directory off the root where all that business logic would take place.  Functions in ```services``` would then call ```ctx.db``` etc if they needed access to anything in a database.
* Linting rules extend JS Standard.
* I've made a comment on this in the code, but the assignment specifically states that the new card add logic must add to the "To do" list (rather than giving the user the option) - this is the reason why this has been hard coded. (Quote from the assignment reads:

>   On submission it should create a new card in the “To do” list as
> shown in Figure 4.

Hopefully the code is readable enough to explain any other decisions made for themselves :) Look forward to hearing from you.
