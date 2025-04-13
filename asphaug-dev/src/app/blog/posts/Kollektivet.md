---
title: 'Introducing Kollektivet — The App for Shared Living'
date: '2025-04-20'
summary: 'A smarter way to live together: why I built Kollektivet, the app designed to make shared living less chaotic and more collaborative.'
tags: ["Draft", "App", "IOS", "Swift", "React", "Backend"]
---

Living with roommates can be awesome — but let's be honest, it can also be *a total mess*.

From tracking who cleaned the kitchen last to turning chores into games or coordinating cleaning schedules, co-living comes with its fair share of friction. That's exactly why I built **[Kollektivet](https://kollektivet.app)** — a new app that helps you and your housemates stay organized, communicate better, and enjoy your shared space.

### 🧠 Why Kollektivet?

Over the years, I wish I could say I’ve lived in a bunch of different shared flats — but I haven’t. Still, I’ve heard stories: some were clean and chill, others... less so 😅. What I *have* noticed in all these examples is the same recurring struggle to keep things fair and clear:

- Who's cleaning more than others? (Cue the blame game.)
- Who cleaned what?
- Whose turn is it to take out the trash?
- Where did we write that one important thing again?

So instead of relying on spreadsheets, sticky notes, or group chats that disappear into the void, I decided to build a tool that brings it all together — in one place.

### 🚀 What It Does

Kollektivet is built with simplicity and ease of use in mind. Here's what you can do:

- **Log Household Tasks:** Keep tabs on your cleaning conquests—no more mystery messes!
- **Earn Points:** Every sweep earns you bragging rights (and points)! Rise up the leaderboard.
- **Monthly Competitions:** New month, new challenge. Who will be crowned Chore Champion?
- **Shared Households:** Rally your crew and share the cleaning glory!
- **Activity Timeline:** A cheeky timeline to remind you who owes the vacuum!
- **Customizable Tasks:** Make your own chores—because your home is as unique as you are!

And it’s all wrapped in a clean, minimal design built with performance in mind.

### 🔧 How I Built It

Kollektivet is built with:

- **Swift** (yeah, I know… not the most obvious choice for an infra guy)
- **React Native** for a cross-platform frontend
- **DynamoDB** for the database
- **Cognito** for authentication
- **API Gateway** to manage requests
- **Step Functions** for backend logic

I was going to use Lambdas... but then I thought, *why not try something new?* I actually ended up loving Step Functions! They're super powerful — just a bit of a pain to terraform 😅

### 🛠️ What’s Next?

This is just version 1. I'm planning to add:

- Chores gamification (yes, you’ll be able to level up by vacuuming)
- Group budgeting tools
- Better notifications
- Native app wrappers
- More games (because why not?)

I'm super excited to keep improving it based on real user feedback. If you're currently in a collective or planning to move into one, give it a spin and let me know what you think!

---

👉 [Check out Kollektivet](https://kollektivet.app)  
🗣️ Got feedback or want to collab? [Hit me up on LinkedIn](https://www.linkedin.com/in/simen-asphaug-358030b0/)

Let’s make shared living easier ✌️
