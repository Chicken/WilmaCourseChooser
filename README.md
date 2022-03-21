# Wilma Course Chooser

Sometimes it's hard to get the courses you want  
because 400 people are choosing at the same time  
wilma servers are slow and groups fill up fast.

You can schedule this script to run when the choosing  
starts and instantly get in the courses before anyone else.

Field-tested by myself. Twice.

## Usage

1. Clone this repository using `git clone --recursive https://github.com/Chicken/WilmaCourseChooser`
1. Run `npm run build` to install dependencies and build openwilma.
1. Copy the example files and remove the `.example` part.
1. Input your credentials in `creds.txt` and check your wilma  
   if you need to have the numeric slug after it.  
   DO NOT INCLUDE THE TRAILING SLASH IN YOUR WILMA URL  
   openwilma is a very cool library with no bugs at all...
1. There is no fancy system for getting the course ids but you  
   can extract them from html source code beforehand using inspect element.
1. To run the script use `npm start` which you can schedule using cron for example.
