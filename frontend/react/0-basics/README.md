==== Basics ====

# Introduction
This project contains the basics of React. It contains mini-apps developed from the book Learning React 2nd edition

# Apps
## Menu
Basic React components, passing data via props

## Colors
a color organizer featuring state and props to add, remove and, show colors. There are different versions of the components for different ways to doing things in React

### Features
- Uncontrolled form component
- Controlled form component
- Custom hook based form component
- Context API

## Hooks
Shows different React hooks and their usage

### Features
- Checkbox features the useState, useEffect and useReducer hooks
- Use of the dependency array
- useMemo and useCallback hooks for performance optimization
- memo function to create pure components that only render when the props change

## Loading Data
Shows how to fetch data from an API and render components using it

### Features
- Custom useFetch hook to abstract making API request and its states (loading, loaded and error)
- Waterfall requests (components that make the API calls are nested, so the requests happen one after another)
- Parallel requests (components (most) that make API calls are at the same level, so requests are made in parallel)
- Custom Fetch component to further abstract fetching data and rendering it
- Using useRef to cancel updating the state if the component that made the request in unmounted