# React Booking System

## Motivation
This was something I developed for a client's website. It's a booking system with a client and admin page. 

## How it works
Requests can be made by the client by filling in a form, selecting the dates they want and hitting submit. These requests will be pushed to the dashboard of the admin panel, giving the admin the ability to approve or deny requests. Once booked, the admin can hover over each reserved date and it will list the client's contact details.

## Installation
You will need to update the bsCredentials file with the link to your MongoDB database (If you don't have one you can register it for free at https://mlab.com://mlab.com/. The schemas are written in Mongoose, so without some heavy adjustments, I'm afraid SQL won't work.

You can use the dev server for each section of the booking system, but for the client and admin sections it might be better to run react-scripts build to save resources if you're looking to publish this yourself.
