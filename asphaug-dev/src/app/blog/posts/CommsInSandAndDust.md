---
title: 'Comms in Sand and Dust – Running IT Operations in Extreme Conditions'
date: '2025-04-13'
summary: 'Lessons from military field ops applied to cloud architecture: how operating in extreme environments shaped my approach to resilience, security, and automation in AWS.'
tags: ["Draft", "Cloud", "AWS", "Security", "DevOps", "PACE", "Resilience"]
---

In 2021, I was stationed in Mali as part of the Norwegian contribution to the UN peacekeeping mission. My job? Keep communications up and running in a rough unpredictable environment.

Scorching heat, power instability, satellite links stretched to their limits—and yet, operational uptime wasn’t optional. IT had to just work. There was no room for “we’ll fix it in the morning.”

This experience taught me more about resilience, redundancy, and real-world problem solving than any certification ever could. And surprisingly, much of what I learned applies directly to modern cloud operations in platforms like AWS.

---

## Lessons from the Field – and How They Apply in the Cloud

### 🔐 1. Redundancy Isn’t Optional

In Mali, we relied on multiple forms of communication: Fibre, tactical radios, satellite antennas, and a backup 4G link we coordinated with locals. If one failed, the others had to take over instantly.

➡️ In AWS terms, this translates to:

- Multi-AZ and Multi-Region architecture  
- Failover configurations  
- Load balancing and autoscaling groups  
- No single point of failure, *ever*

---

### 🔍 2. Visibility is Survival

Dust storms, extreme heat, and unpredictable weather patterns made radio communication unstable. To better understand and adapt to these challenges, we relied on **spectrum analyzers** to monitor signal strength and interference across frequencies. Formal monitoring tools were limited, so instead, we conducted **frequent manual radio checks**—sometimes every hour—to ensure operational readiness and to detect degradation early. Over time, we began to recognize patterns in how environmental conditions—especially airborne dust—affected range and clarity. This kind of hands-on, field-based "monitoring" was essential to keep the mission running.

➡️ In cloud:

- Use **CloudWatch Logs** and **Metrics** for real-time alerts  
- Enable **CloudTrail** and **AWS Config** for audit trails  
- Implement dashbords using **cloudwatch** or **Grafana** for live operational overviews

---

### 🔒 3. Secure by Necessity

When operating in a volatile region, security isn’t a “nice to have.” We followed strict access control, encryption protocols, and compartmentalization of data and systems.

➡️ Cloud reflection:

- Enforce **least privilege** with IAM roles and policies  
- Use **KMS** for encryption at rest and in transit  
- Separate environments using **subnets**, **security groups**, and **network ACLs**
- Treat **Secrets Manager** like a vault, not a notepad

---

### ⚙️ 4. Automation = Sanity

Manually configuring comms gear in 40°C heat? Not ideal. Wherever possible, we used templates to replicate configurations, reduce human error, and save time.

➡️ In the cloud, automation is life:

- Infrastructure as Code (Terraform, CloudFormation)  
- CI/CD pipelines for safe, repeatable deployments  
- Good runbooks for recovery

---

### 📡 5. Think Tactically – Design Strategically

One of the most valuable frameworks I brought with me from military operations is **PACE planning**—a tactical approach to ensuring communications always stay online, no matter what. It stands for:

- **Primary**  
- **Alternate**  
- **Contingency**  
- **Emergency**

In the field, **PACE planning was second nature**. We applied it to everything from radios to satellite links—because failure wasn’t just inconvenient, it could be mission-critical. The core idea is simple but powerful: **never rely on a single method of communication**. Always plan for what happens if your primary fails… and then what happens if *that* fails too.

Each level in the PACE plan should be **increasingly independent** of the previous one—technologically, geographically, and operationally. That layered redundancy gave us confidence in the face of chaos. And it’s a mindset that translates perfectly to modern cloud infrastructure.


🪖 In the field, this might look like:

- **Primary**: Fiber internet link via local ISP  
- **Alternate**: Satellite uplink  
- **Contingency**: Tactical radio network  
- **Emergency**: Field runner with physical message (yes, really)


➡️ Cloud equivalent:

- **Primary**: direct internet link via NAT Gateway  
- **Alternate**: VPN fallback  
- **Contingency**: backup region  
- **Emergency**: Manual failover plan with S3-hosted static backup

---

## 🧭 Final Thoughts

You don’t need to be deployed to a desert to understand that **reliability is earned, not assumed**. Whether you’re maintaining connectivity for a military operation or keeping a cloud-based service online for customers, the same mindset applies:

- Plan for failure  
- Observe everything  
- Automate where you can  
- And always, always secure your comms
