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
 id: "THIS_IS_THE_STAND-TO!'S_DATE'"

 title: ARTICLE_TITLE

 subtitle: ARTICLE_SUBTITLE

 date: ARTICLE_DATE

 # Body content to be added to the left column
 body: **NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
   - heading:
   - paragraph:
   - list: **NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
     - item:
     - item:

 # Resources to be added below the left column
 links: **NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
   - section: **NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
     - section-title: PLACE_THE_SECTION_TITLE_HERE
     - list:
       - title: PLACE_THE_TITLE_OF_THE_LINK_HERE
         url: PLACE_THE_URL_FOR_THE_LINK_HERE

# The links > section > section-title + list > tile + url can be repeated
# as many times as is necessary here:

- section: **NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
  - section-title: PLACE_THE_SECTION_TITLE_HERE
  - list:
    - title: PLACE_THE_TITLE_OF_THE_LINK_HERE
      url: PLACE_THE_URL_FOR_THE_LINK_HERE

 # Quote content to be added before the

 # Events to be added to the right column
 # This section is similar to both previous sections (links & body) in that
 # they can be repeated as many times as desired, provided that the Format
 # is not changed.
 events: **NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
   - section: **NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
       - date: MONTH_AND_YEAR_FORMAT_HERE **ALL-CAPS**
       - content: **NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
         - subcontent: African American/ Black History Month
           url: https://www.army.mil/africanamericans/
           title: African Americans in the U.S. Army

   - section:
       - date: MARCH 2019
       - content:
         - subcontent: Women's History Month
           url: https://www.army.mil/women/?st
           title: Women in the U.S. Army

```
  - A few things to keep in mind when filling out this template is that any links added within the body (via heading or paragraph) will --at this point-- need to be wrapped in a tags like this:
  `<a href="{{ PLACE_LINK_URL_HERE }}">{{ PLACE_LINK_NAME/TITLE_HERE }}</a>`

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

<!--
  Add back this to the jquery files:
  # sourceMappingURL=jquery-1.10.2.min.map
-->

<!-- Notes for pulling over archived content -->
<!-- 
    -- Replace \n with a space: " "
    -- 
 -->

 ## Resources: 
* [sort filter to sort numerically in liquid jekyll](https://www.google.com/search?safe=active&client=firefox-b-1-d&ei=XiCdXNb3DpK8sAWK-6boAw&q=sort+filter+to+sort+numerically+in+liquid+jekyll&oq=sort+filter+to+sort+numerically+in+liquid+jekyll&gs_l=psy-ab.3..33i160l2.9527.19529..19785...2.0..0.207.4892.2j35j1......0....1..gws-wiz.......0i71j0i20i263j0j0i22i30j0i22i10i30j33i22i29i30j33i299.xubVoDyv0XM)

* [Jekyll: What is the default _data sorting criteria?](https://stackoverflow.com/questions/48345864/jekyll-what-is-the-default-data-sorting-criteria)
* [Jeykll: Sorting files in _data subfolders by common property](https://stackoverflow.com/questions/28058524/jeykll-sorting-files-in-data-subfolders-by-common-property)