# Brizy content placeholders sdk

Let's assume we have an email template that must be sent for many users and this template must contain the username and some other dynamic info.

Email template:
```
Hi {{username}}
I wanted to personally welcome you to {{company-name}}
If you have any questions, you can always email us to {{our-email}}

Best Regards.
```

As you can see the template above contains three placeholders *username*, *company-name* and *our-email*.

This can easily achieved by replacing the strings with str_replace but what if you have 100  placeholders and some of them must get info from resources like a DB or an API.


### Architecture

Few words about the classes you will work with

#### Registry Class
A class that manage the palceholders. You can register or obtain placeholders. See the examples blow.

#### Placeholder Interface
All placeholders must implement this interface.

The `getValue` method must return the string that will replace the placeholder. This method receive a context and the content placeholder object (An object that contain all the info  about the placeholder found in the original content)

The `support` method must return true if the class can handle the placeholder.

#### Context Interface
There are cases when the placeholder will need some specific info like the current page or current request, session, etc..  all these objects must be passed in a context object.

#### Replacer Class
The class has only one method: replacePlaceholders. Self explanatory :).

