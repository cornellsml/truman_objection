The Truman Platform 
=======================

Named after the 1998 film, The Truman Show, **the Truman Platform** is a social media simulation platform created by [The Cornell Social Media Lab](https://socialmedialab.cornell.edu/) to provide researchers a community research infrastructure to conduct social media experiments in ecologically-valid realistic environments. Researchers can create different social media environments with a repertoire of features and affordances that fit their research goals and purposes, while ensuring participants have a naturalistic social media experience. 

This current iteration studies **effective objections against problematic content on social media**. 

### **Demo:** 
https://truman-objections-v1-5d359188df22.herokuapp.com/feed_no?off_id=0&obj_t_id=0&obj_m_id=0.

Change the query parameters of the URL to be directed to the different experimental conditions. See below for more information.
| Query parameter  | Definition | Values |
| ------------- | ------------- | ------ |
| off_id  | Indicates the offense message type  | 0, 1, 2<br/><br/> 0: _Misinformation_<br/>1: _Harassment_<br/>2: _Hate Speech_ |
| obj_t_id  | Indicates the objection message type  | 0, 1, 2, 3, 4, 5, 6<br/><br/>0: _Dismissal-Objectionable Comment_<br/>1: _Imploring-Conscientious Appeal_<br/>2: _Imploring-Logical Appeal_<br/>3: _Threatening-Reputational Attack_<br/>4: _Threatening-Violent Warning_<br/>5: _Preserving-Personal Abstinence_<br/>6: _Preserving-Group Maintenance_<br/>none: No objection message |
| obj_m_id  | Indicates the objection message number  | 0, 1 <br/><br/> 0: first message<br/>1: second message |

### **Conference:**
Zhao, P., Bazarova, N., DiFranzo, D., Hui, W., Kizilcec, R., & Margolin, D. (2023). What are effective objections against problematic content on social media? _Accepted for presentation at the 73rd Annual International Communication Association Conference, Toronto, Canada._
