# Djedi - JSON

### installing

```
npm install -S djedi-json
```

### Reskinning the admin

- Simply supply a wrapper component with new styles inside of it. All admin css-variables are prefixed with `admin--`

### Modularitet

- Default-komponenterna som kräver dependencies bör plockas bort och läggas i separata paket. T.ex. Kan man registrera `image/imgur` eller `input/text`
  Det gör adminet lätt och utan dependencys om man vill bygga allting själv beroende på projekt.

- Gör det möjligt att styra var edits hamnar.
- Page-komponenten ska ha en egen edit.

- vid enter lägg automagiskt till en komponent

# Actual README

# Djedi pages frontend

# Basic setup

# Documentation

## Admin

## config

## Components

### registering components

## Edits

## Pre-made edits

### Common parameters

### CMSType/Image

### CMSType/Text

slate

### CMSType/String

plain string

### CMSType/Select

options, can be either a list of strings or an object with `label`and `value` keys.

## registering custom edits

All custom edits needs to accept at least `value` and `onChange` as props.
type
use createCMSType.

### overriding edits

## Usage

## Typescript
