## Initial configuration
    set PATH=%PATH%;C:\Users\someone\Downloads\node\node\
    set PATH=%PATH%;node_modules\.bin\
    npm install

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
