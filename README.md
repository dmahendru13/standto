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

title: TITLE_OF_STAND-TO

subtitle: SUBTITLE_OF_STAND-TO

date: DAY_OF_THE_WEEK, MONTH DAY, YEAR

# Body content to be added to the left column
body: #**NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
  - heading: "PLACE HEADING IN PARENTHESIS"
  - paragraph: "PLACE PARAGRAPH IN PARENTHESIS"
  - list: #**NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
    - item: "PLACE LIST-ITEM IN PARENTHESIS"
    - item: "PLACE LIST-ITEM IN PARENTHESIS"
# Resources to be added below the left column
links:
  - section:
    - section-title: SECTION_TITLE
    - list:
      - link: >
          [LINK NAME](LINK_URL)

# Quote content to be added before the
quote:
  - heading: "PLACE HEADING IN PARENTHESIS"
  - blockquote: "PLACE BLOCKQUOTE IN PARENTHESIS"
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
        - item: >
          If you have a colon (:) after a word, the preceding words will turn red and the following word will remain yellow. This is a known issue and will not break the site.

  - section:
      - date: MONTH YEAR
      - content:
        - item: >
            [LINK NAME](LINK_URL)

```


  - If you need to add a link to the body in either a heading/paragraph/list, simply add it similarly to how it is added in the quote or events section:
   - `[LINK NAME](LINK_URL)`

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
      * Once at the root, look for the corresponding directory name that matches the `year` of the ST that you just moved to the `_data/archived-standto/recent-archives/{CURRENT_YEAR}` in steps 2-3.
          1. Click on and enter folder for the correct year.
          2. Select the correct, corresponding month and create a new file for the now archived ST
          3. Use the following naming convention `YEAR-MONTH-DAY-st.html`
             * `2019-05-02-st.html`
          4. Within this newly created file, paste the following content:
            ~~~~
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
              ~~~~
              Update the content here to reflect the **title**, **id**, **date**, and be sure to include: `{%- include standto-body.html -%}`. Additionally, `file: ""` here is the day of the ST.
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