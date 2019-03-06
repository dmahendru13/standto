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

# Usage
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