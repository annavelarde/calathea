<!-- @format -->

< CHALATEA APP > Module 2 Week 3 day 1
//MVC - MODEL VIEWS CONTROLER//

3 things for each data property:
Is it required = !
Is it unique = Unique
Is it optional. If so, does it have a default value = ? with Default

## SIGN UP:

--User
name: String ! ✅
email: String ! Unique ✅
password: String ! ✅
image: String ? With Default ✅
location: String ? ✅

<!-- socialMedias: ['linkedin', 'github', 'twitter']? = [] we will decide it later on--> ✅

<!-- jobTitle: String?
cohort: String?
slack: String?
personalSite: String?
jobLocation: String? -->

## PUBLICATIONS/POST:

--Post
image: String ? Optional ✅
title: String? Optional ✅
text: String! ✅
user: User! ✅

hashtag: Hashtag? Optional✅
text: String!

Comments:
text: String!✅
author: User!✅
post: Post!---------????? Important to check cuz it wasn't there ✅
date: Date! ✅

date: Date!✅

---

GET / Home Page ✅

GET / Signup
POST / Signup

GET / Login ✅
POST / Login
GET / Logout

POST / update-profile
POST / update-password

POST / delete-account

GET / profile

GET / see-posts
POST / add-post
POST / edit-post

GET / Profiles/:dynamic-id
GET / Profiles

POST / add-comment

POST / add-image

<!-- GET / map-view IS IT  NECEESSARY????-->

✅

videos:
Module 2 Week 3 day 1 ✅
Module 2 Week 3 day 2
Module 2 Week 3 day 3
