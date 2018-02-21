## Initial configuration
    set PATH=%PATH%;C:\Users\someone\Downloads\node\node\
    set PATH=%PATH%;node_modules\.bin\
    npm install

## Additional configuration
    npm install --save @types/sql.js
    curl -O https://raw.githubusercontent.com/kripken/sql.js/master/js/sql.js
    # npm install --save ng2-dropdown-multiselect # not working
    npm install --save ng2-multiselect
    npm install --save @ngui/auto-complete
    npm install file-saver --save
    npm install @types/file-saver --save

## Update angular-cli to avoid "Cannot find module '@angular-devkit/core'" error.
    # https://qiita.com/homahi/items/e27b3b90c30b3698671f
    npm uninstall @angular-cli
    npm cache verify
    npm install @angular/cli@latest

## Start server (and open in a browser)
    ng serve --open

## Build
    for /f "usebackq tokens=*" %a in (`cd`) do @set curdir=%a
    ng build --base-href %curdir%\dist\index.html

or replace <base href="..."> with the code below

    <script>document.write('<base href="' + document.location + '" />');</script>

cf. https://github.com/angular/angular/issues/13948

> Justsahid commented on 20 May •  edited 
> Thanks @Markovy @audrummer15
> 
> I got it working completely in a fairly complex angular 2 app with multiple nested routes.
> 
> All I needed was
> 
> Router configuration with
> CommonModule,RouterModule.forRoot(routes,{useHash:true})
> 
> and this in the index.html file
> Removed base Href="/" tag from html and added it like this.
> <script>document.write('<base href="' + document.location + '" />');</script>
