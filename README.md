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
body: **NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
  - heading: "PLACE HEADING IN PARENTHESIS"
  - paragraph: "PLACE PARAGRAPH IN PARENTHESIS"
  - list: **NOTHING CAN GO HERE--OTHERWISE IT WILL BREAK THE SITE**
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
        - item: "If just adding text, place it in parenthesis like this"


  - section:
      - date: MONTH YEAR
      - content:
        - item: >
            [LINK NAME](LINK_URL)

```


  - If you need to add a link to the body in either a heading/paragraph/list, simply add it similarly to how it is added in the quote or events section:
   - `[LINK NAME](LINK_URL)`

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
