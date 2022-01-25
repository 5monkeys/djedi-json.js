# Djedi - JSON

A modular DIY-admin able to utilize existing components from your react frontend.

[Documentation](#Documentation)
[Develop this package!](#Development)

### installing

```
npm install -S djedi-json react react-dom
```

# Djedi pages frontend

# Basic setup

# Documentation

## Admin

## config

## Components

## Contexts

useCMS
useEdit

### registering components

## Edits

- Context useEdit

## Pre-made edits

### Common parameters

### CMSType/Children

append, self, allowed

### CMSType/String

plain string

### CMSType/Select

### CMSType/Custom

options, can be either a list of strings or an object with `label`and `value` keys.

## registering custom edits

All custom edits needs to accept at least `value` and `onChange` as props.
type
use CMSType.custom.

### overriding edits

## Usage

## Typescript

## Development

Within this repo is an example Create-react-app that has a link into the folder above, being the admin.

Get started:

```
npm ci; // install dependencies for djedi-json
npm start; // starts the rollup build-watcher
cd example;
npm ci;  // install dependencies for the example app
npm start; // start the CRA app.
```
