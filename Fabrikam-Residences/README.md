# Azure Monitor's Application Insights Demo

## Fabrikam Residences
Fabrikam Residences is a fictitious company whose Residence Portal application is being used to demonstrate different scenarios that can be addressed using Application Insights. 

## Demo
This project is the final code sample produced during the soon to be published Pluralsight course, Instrument Microsoft Azure Application Insights in a Web Application.

## Applications

### /ResidencePortal-Api
The ResidencePortal-Api application is a Node.js / Express application with the applicationinsights package included.

To view application insights telemetry you will need to create your own free Azure Application Insights resource and update the .env property APPINSIGHTS_INSTRUMENTATIONKEY with your InstrumentationKey

The application can be started with the command 

```npm start```

### /ResidencePortal-UI
The ResidencePortal-UI is an Angular 8 application with the applicationinsights package included.

To view application insights telemetry you will need to create your own free Azure Application Insights resource and update the .env property APPINSIGHTS_INSTRUMENTATIONKEY with your InstrumentationKey

The application can be started with the command 

```ng serve --open```