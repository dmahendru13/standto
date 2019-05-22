# STAND-TO!
New STAND-TO! site.

## Requirements

The Following tools must be installed to host the site:
0. node.js
1. grunt.js
2. Ruby
3. Sass
4. jekyll

## Installation
```bash
git clone git@github.com:armydotmil/standto.git
cd leaders
git checkout develop
bundle install
sudo npm install
```

## Format:
```yaml
id: "YEAR-MONTH-DAY"

title: "TITLE_OF_STAND-TO"

subtitle: "SUBTITLE_OF_STAND-TO"

st_date: "DAY_OF_THE_WEEK, MONTH DAY, YEAR"

# Body content to be added to the left column
body: #**NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
  - heading: "PLACE HEADING IN PARENTHESIS"
  - paragraph: "PLACE PARAGRAPH IN PARENTHESIS"
  - list: |  #**NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
    * EACH BULLET POINT IS ADDED IN THIS WAY.
    * EACH BULLET POINT IS ADDED IN THIS WAY.

# Resources to be added below the left column
links:
  - section:
    - section-title: "Resources:"
    - list: |
      - item: >
         * [LINK NAME](LINK_URL)
# the asterisk (*) creates a list item in markdown
      - list: |
         * [LINK NAME](LINK_URL) Plus extra text after the link can go here as well
      - list: |
         * THIS CAN BE A TITLE WITH A SUBLIST BELOW:
           * [LINK NAME](LINK_URL)
           * [LINK NAME](LINK_URL)
# using the above method, it creates a list, with a sublist as can be seen here:
# https://www.army.mil/standto/2019-05-17
# the list that I am referring to is under: Virtual reality "In Our Boots" Apps:

  - section:
    - section-title: "Social Media presence:"
    - list:
      - list: |
         * [LINK NAME](LINK_URL) Plus extra text after the link can go here as well
      - list: |
         * [LINK NAME](LINK_URL) Plus extra text after the link can go here as well

# Quote content to be added before the
quote:
  - heading: "PLACE HEADING IN PARENTHESIS"
  - blockquote: "PLACE BLOCK QUOTE IN PARENTHESIS"
  - source: "PLACE SOURCE IN PARENTHESIS"
  - link: >
      [LINK NAME](LINK_URL)

  # Events to be added to the right column
events:
  - section:
      - date: MONTH YEAR
      - content:
        - item: >
            [LINK NAME](LINK_URL)
        - item: >
            This is how you would write just plain text.
        - item: >
            [LINK NAME](LINK_URL) Plus extra text after the link can go here as well

  - section:
      - date: MONTH YEAR
      - content:
        - item: >
            [LINK NAME](LINK_URL)

```

  - **Note**, while using a colon (:) will not strictly speaking break the ST/the yml data file, it will throw off the color scheme. That said, it is **strongly** recommended that within a section that you *do not* use parenthesis to enclose the text (i.e., title, subtitle, the links section or the events section), replace the colon (:) with the HTML encoding:
    - `&#58;`
  - If you need to add a link to the body in a heading/paragraph/list, simply add it similarly to how it is added in the quote or events section:
    - `[LINK NAME](LINK_URL)`

## Sample YML File:

```YML
id: "2019-05-17"

title: "U.S. Army's Marketing Campaign: \"In Our Boots\""

subtitle: "Provided by Army Marketing and Research Group"

st_date: "Friday, May 17, 2019"

# Body content to be added to the left column
body:
  - heading: "What is it?"
  - paragraph: "*In Our Boots* is the U.S. Army's new recruitment marketing effort for prospective recruits. This is an immersive virtual reality experience to inspire and inform brave young men and women when it comes to considering a future in the U.S. Army. By engaging with *In Our Boots*, the young Americans will experience, what it is like to be an Army Soldier on a mission with their team."
  - heading: "What are the current and past efforts of the Army?"
  - paragraph: "*In Our Boots* is the U.S. Army's new recruitment marketing effort for prospective recruits. This is an immersive virtual reality experience to inspire and inform brave young men and women when it comes to considering a future in the U.S. Army. By engaging with *In Our Boots*, the young Americans will experience, what it is like to be an Army Soldier on a mission with their team."
  - paragraph: "The prospects can follow the following career fields as they lead their teams through high intensity missions:"
  - list: |
      * Special Operations Sniper
      * Explosive Ordnance Disposal Technician
      * Tank Commander
      * Unmanned Aircraft Systems Operator

  - paragraph: "The integrated campaign can be experienced through the interactive campaign landing experience (goarmy.com/inourboots) or *In Our Boots* app that will be available for download on iOS, Google Play and Oculus GO stores."
  - paragraph: "Based on consumer data along with predictive analytics, Army Marketing and Research Group (AMRG) has designed a more holistic marketing campaign personalized to reach a specific audience, and is currently being used to reach audiences in the Chicago area."
  - heading: "What continued efforts does the Army have planned?"
  - paragraph: "AMRG will continue to:"
  - list: |
      * Communicate and inform the Army mission to prospects and their influencers through TV commercials, digital, paid search, billboards, and social media ads.
      * Market innovative efforts to appeal to prospect audience between the ages of 17-24.
      * Utilize the personalized and holistic marketing campaign strategy, being used in Chicago, in five other areas to include Boston, Dallas and Minneapolis.
      * Use digital and social media to engage with prospects and influences and drive them to GoArmy.com.
      * Market in a strategically integrated way, in order to maximize return on investment.
  - heading: "Why is this important to the Army?"
  - paragraph: "*In Our Boots* gives prospective recruits an authentic view into what it is like to step into the boots of a U.S. Army Soldier. By informing the young Americans, the Army gets quality individuals to speak to recruiters and enlist into the Army."

# Resources to be added below the left column
links:
  - section:
    - section-title: "Resources:"
    - list: |
       * [U.S. Army Recruiting Command](https://recruiting.army.mil/)
       * [In our Boots&#58; Interactive missions](https://www.goarmy.com/inourboots/index.html/missions)
       * Virtual reality \"In Our Boots\" Apps&#58;
         * [iOS](http://bit.ly/InOurBootsAppleApp)
         * [Android](http://bit.ly/InOurBoots)

  - section:
    - section-title: "Social Media presence:"
    - list: |
       * [Facebook](https://www.facebook.com/goarmy/) @goarmy
       * [Twitter](https://twitter.com/GoArmy) \#InOurBoots

# Quote content to be added before the
quote:
  - heading: "Focus Quote for the Day"
  - blockquote: "Readiness is the Army's #1 priority, and readiness starts with recruiting. We're modernizing our approach to connect with today's youth, through sports, functional fitness, and social media where Generation Z's are communicating. We have to connect with people where they are to find those qualified individuals for Army service."
  - source: "Maj Gen. Frank M. Muth, commander, U.S. Army Recruiting Command"

# Events to be added to the right column
events:
  - section:
      - date: MAY 2019
      - content:
        - item: >
            National Asian Pacific Heritage Month | Visit [Asian Pacific Americans in the U.S. Army](https://www.army.mil/asianpacificamericans?st)
        - item: >
            May 18&#58; Armed Forces Day
        - item: >
            May 27&#58; Memorial Day
```

## How to Update the STAND-TO!
  1. Copy content from [_data/current-standto/todays-focus.yml](https://github.com/armydotmil/standto/tree/master/_data/current-standto)
  2. Create new file in [_data/archived-standto/recent-archives/{CURRENT_YEAR}](https://github.com/armydotmil/standto/tree/master/_data/archived-standto/recent-archives/2019)
      * The {CURRENT_YEAR} is the current calendar year
      * e.g.: [_data/archived-standto/recent-archives/2019](https://github.com/armydotmil/standto/tree/master/_data/archived-standto/recent-archives/2019)
      * The naming convention for the ST data files is: `[day].yml`
      * e.g.:  `02.json` for the second day of the month.
  3. After you have created a new .json file, paste the content from `_data/current-standto/todays-focus.yml` into it.
  4. Once that is done, populate [_data/current-standto/todays-focus.yml](https://github.com/armydotmil/standto/blob/master/_data/current-standto/todays-focus.yml) with the new ST content.
  5.  Next, go to the `_posts` directory in the root.
      * You should be able to accomplish this by clicking on [standto](https://github.com/armydotmil/standto) at the top of the page.
  6.  Once at the root, look for the corresponding directory name that matches the `year` of the ST that you just moved to the `_data/archived-standto/recent-archives/{CURRENT_YEAR}` in steps 2-3.

        1. Click on and enter folder for the correct year.
        2. Select the correct, corresponding month and create a new file for the now archived ST
        3. Use the following naming convention `YEAR-MONTH-DAY-st.html`
           * `2019-05-02-st.html`
        4. Within this newly created file, paste the following content:

            ```
              ---

              layout: default
              pageid: archived-standto
              data-path: recent-archives

              permalink: /archive_YEAR-MONTH-DAY/

              year: "YEAR"
              month: "MONTH"
              file: "DAY"

            date: DAY_OF_THE_WEEK, MONTH DAY, YEAR

            metaTitle: "TITLE_OF_STAND-TO"

              ---

              {%- include standto-body.html -%}
              ```

        5. Update the content here to reflect the **title**, **id**, **date**, and be sure to include: `{%- include standto-body.html -%}`. Additionally, `file: ""` here is the day of the ST.

  6. **NOTE**, it is very important to use the two-digit convention for both day's & month's.
      * e.g.: `09.json` for the ninth day of the week, or `05` for the month of May.
  7. Next, run the following commands:
      ```bash
        bundle exec jekyll build
        grunt production
      ```
  8. Finally, proceed as though you would normally when updating socialmedia or any other microsite.

## Usage
```bash
bundle exec jekyll serve --watch
```
Adding the `--watch` makes the jekyll refresh the files once they have been save and speeds up the process of reviewing/making changes and edits
  - However, adding the `--watch` may cause a console error:
  ```bash
    ERROR Errno::EPROTOTYPE: Protocol wrong type for socket
  ```

Once this is done, you can view the site locally using one of the two links below:
  - [http://localhost:4000](http://localhost:4000)
  - [http://127.0.0.1:4000](http://127.0.0.1:4000)

## Jekyll


* Installation docs - http://jekyllrb.com/docs/installation/
* Basic Usage docs - http://jekyllrb.com/docs/usage/

## Resources:
* [sort filter to sort numerically in liquid jekyll](https://www.google.com/search?safe=active&client=firefox-b-1-d&ei=XiCdXNb3DpK8sAWK-6boAw&q=sort+filter+to+sort+numerically+in+liquid+jekyll&oq=sort+filter+to+sort+numerically+in+liquid+jekyll&gs_l=psy-ab.3..33i160l2.9527.19529..19785...2.0..0.207.4892.2j35j1......0....1..gws-wiz.......0i71j0i20i263j0j0i22i30j0i22i10i30j33i22i29i30j33i299.xubVoDyv0XM)

* [Jekyll: What is the default _data sorting criteria?](https://stackoverflow.com/questions/48345864/jekyll-what-is-the-default-data-sorting-criteria)
* [Jeykll: Sorting files in _data subfolders by common property](https://stackoverflow.com/questions/28058524/jeykll-sorting-files-in-data-subfolders-by-common-property)
