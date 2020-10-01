# FelixTellmann.com - Blog & Project Portfolio


My Old Personal Website - replaced by: www.felixtellmann.com

to visit the old page visit: https://old-tellmann-site.vercel.app/


// TODO: Write a proper project description.

My personal portfolio and blog website. Developed to showcase my skills in design and development, to contribute towards the community with open source projects and helpful code snippets. The website will
help me to create new leads for freelancing projects and provide a communication platform for potential clients.



## Design

### 1. Table of Contents
The Design development process is broken down into five parts:
* **Component Breakdown & framework variables - CSS Rules**
* **Design Research & Inspiration**
* **Wireframing**
* **Asset Development & Sourcing**
* **CSS - SASS Development**

### 2. Component Breakdown & CSS Variables

##### 2.1 Typography

Base Fonts: 

* *Headings:* Metropolis

* *Content:* Raleway

Font Styles:

```

body {
    font-family: Raleway;
    font-size: 16px;
    line-height: 20px;
    font-weight: normal; /* 400 */
}

.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    font-family: Metropolis;
    line-height: 1.1;
}

strong {
    font-weight: bold /* 700 */
}
.thin {
    font-weight: 200;
}

.font-size-hero {
    font-size: 81px
    font-weight: 700;
}

// Page Title - Use only once per page.
.h1, h1 {
    font-size: 63px
    font-weight: 700;
}

// Major headlines & page subtitle
.h2, h2 {
    font-size: 56px
    font-weight: 700;
}

// Used in Modal only
.h3, h3 {
    font-size: 40px
    font-weight: 500;
}

// Main heading - Blog titles. - Change for SEO Efficiency?
.h4, h4 {
    font-size: 32px
    font-weight: 600;
}

.h5, h5 {
    font-size: 20px
    font-weight: 500;
}

.h6, h6 {
    font-size: 16px
    font-weight: 500;
}

p {
    font-size: 16px
}

nav {
    font-size: 14px;
}

.small {
    font-size: 12px; 
}

.xs small {
    font-size: 10px;
}

.button {
    font-family: Metropolis;
    font-size:12px;
    font-weight:500;
    letter-spacing:1px;
    line-height: 1;
    text-align:left;
    text-decoration:none;
    text-transform:uppercase;
}   
    
```
Inspirational [Source](https://www.crowdfireapp.com/) - Also great for Modal effect.
See [Typography](http://www.FelixTellmann.com/typography.php) for a life example.


##### 2.2 Color Selection

**Light Background Colors:**

* *Light:* #fbfbfd
* *Light gradient:*  { linear-gradient ( 24deg, #d9d9e1, #ffffff );}
* *Light grey:* #ededf1 
* *Light grey darker:* #d9d9e1

**For Light BG Text Colors:** 

* *Text for Light:* #312845
* *Lighter Text for Light:* opacity: 0.42;
* *Link/button Text for Light:* #E94054
* *Highlights on Light:* #dd3256

**Dark/Colorful Background Colors:** 

* *Dark:* #1c1c38
* *Dark gradient:* { linear-gradient( 44deg, #1c1c38, #382447 );}
* *blue:* #44b5d5
* *turquoise:* #3ad2b7
* *Turquoise gradient:* { linear-gradient( 44deg, #44b5d5, #3ad2b7 );}
* *Red:* #E94054
* *Red darker:* #dd3256
* *Red gradient:* { linear-gradient( 84deg, #d62956, #e94054); }

**For Dark/Colorful BG Text Colors:** 

* *Text for Dark/Colors:* #fbfbfd
* *Darker Text for Dark/Colors:* opacity: 0.6;
* *Link/button Text for Dark/Colors:* #ffffff
* *Darker Text for Footer:* #777891


Color Styles:

```
.light-01 {
  background-color: #ffffff;
  color: #312845;
}

.light-02 {
  background-color: #ededf1;
  color: #312845;
}

.light-03 {
  background-color: #d9d9e1;
  color: #312845;
}

.light-04-gradient {
  background: linear-gradient(24deg, #d9d9e1, #ffffff);
  color: #312845;
}

.light-highlight {
  color: #dd3256;
}

.light-faded {
  opacity: 0.42;
}

.dark-01 {
  background-color: #1c1c38;
  color: #fbfbfd;
}

.dark-02-gradient {
  background: linear-gradient(44deg, #1c1c38, #382447);
  color: #fbfbfd;
}

.dark-03-blue {
  background-color: #44b5d5;
  color: #fbfbfd;
}

.dark-04-turq {
  background-color: #3ad2b7;
  color: #fbfbfd;
}

.dark-05-red {
  background-color: #E94054;
  color: #fbfbfd;
}

.dark-06-pink {
  background-color: #dd3256;
  color: #fbfbfd;
}

.dark-07-blue-turq {
  background: linear-gradient(44deg, #44b5d5, #3ad2b7);
  color: #fbfbfd;
}

.dark-08-pink-red {
  background: linear-gradient(84deg, #d62956, #e94054);
  color: #fbfbfd;
}

.dark-faded {
  opacity: 0.6;
}

.dark-darker {
  color: #777891
}

.highlight-blue {
  color: #44b5d5;
}

.highlight-turq {
  color: #3ad2b7;
}

.highlight-red {
  color: #E94054;
}

.highlight-pink {
  color: #dd3256;
}
```

Inspirational [Source](https://www.crowdfireapp.com/) - Also great for Modal effect.
See [Typography](http://www.FelixTellmann.com/typography.php) for a life example.

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc