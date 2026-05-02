# CityHero

CityHero is an urban management platform designed to help people take better care of their cities by turning the reporting of local problems into a meaningful and rewarding experience. We built this project to solve a persistent issue in modern cities: the disconnect between citizens, community efforts, and municipal services.

## Project Vision

The primary goal of CityHero is to transform the way residents interact with their urban environment. Many people want to improve their neighborhoods but do not know where to start or feel that their individual efforts will not be recognized. By gamifying civic engagement, we create a platform where every small action contributes to a larger, visible change on a shared interactive map.

## Core Mechanics

The heart of the project is a dual-track system for classifying and solving urban issues:

### Government and Community Tracks
When an issue is reported, it is categorized based on who is best equipped to handle it. Government issues are routed toward official municipal tracks for problems like major road repairs or utility failures. Resident issues are flagged for the local community, empowering neighbors to handle smaller tasks like trash cleanup or minor repairs themselves. This distinction ensures that resources are allocated efficiently and that the community can take immediate action on smaller problems.

### The Verification Protocol
To ensure that the system remains honest and that rewards are only granted for genuine fixes, we implemented a community-led verification protocol. When an issue marked for the resident track is solved, it does not immediately disappear. Instead, it enters a verification phase. Three independent community members must confirm that the fix is complete before the issue is officially resolved and the reporter or solver receives their reward tokens.

## Technical Decisions

We focused heavily on the user experience and the practical limitations of running a web-based reporting tool in a real city environment.

### Map-First Interface
The application is centered around an interactive map that provides immediate visual feedback. Users can see pending, active, and verifying issues at a glance, allowing them to understand the health of their neighborhood in real-time. We also implemented manual location selection to allow users to report issues precisely, even if their GPS signal is weak.

### Mobile Optimization and Storage
Since reporting often happens on the go, we optimized the app for mobile devices. One critical feature is our canvas-based image compression. Mobile photos are often too large for browser-based local storage, so we implemented a system that automatically scales and compresses evidence photos before they are saved. This ensures that the application remains fast and can store dozens of reports without reaching technical limits.

## Moving Forward

CityHero is designed to be a foundation for a more connected city. In the future, we envision deeper integrations with official municipal databases and the use of machine learning to automatically categorize reported issues based on photo evidence. Ultimately, the project is about building a sense of ownership and community pride, proving that when residents are given the right tools, they can be the most effective guardians of their own city.
