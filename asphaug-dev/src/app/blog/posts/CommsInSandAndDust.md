---
title: "Comms in Sand and Dust - Running IT Operations in Extreme Conditions"
date: "2025-04-13"
summary: "Lessons from military field ops applied to cloud architecture: how operating in extreme environments shaped my approach to resilience, security, and automation in AWS."
tags: ["Draft", "Cloud", "AWS", "Security", "DevOps", "PACE", "Resilience"]
---

In 2021, I was stationed in Mali as part of the Norwegian contribution to the UN peacekeeping mission. My job? Keep communications up and running in a rough, unpredictable environment where failure wasn't just inconvenient, it could be mission-critical.

Picture this: temperatures regularly hit 45°C, dust storms, rain storms, and the power grid went down more often than conference calls start with 'Can everyone hear me?. Yet somehow, communications had to stay online 24/7. There was no room for "we'll fix it in the morning", "let me check Stack Overflow." or in todays age "let me ChatGPT it"

This experience taught me more about resilience, redundancy, and real-world problem solving than any certification ever could. And surprisingly, much of what I learned applies directly to modern cloud operations in platforms like AWS.

The principles that kept critical communications running in some of the most challenging environments are the same ones that can keep your cloud infrastructure reliable when everything else goes wrong.

---

## Lessons from the Field and How They Apply in the Cloud

### Redundancy Isn't Optional - It's Insurance

In Mali, we relied on multiple forms of communication—wired connections, radio systems, satellite links, and local backup options like 4G. If one failed, the others had to take over instantly. No discussion, no debugging, just seamless failover.

The key lesson? **Every critical component needs a backup, and every backup needs a backup.**

But here's what most engineers get wrong: they build redundancy for the components they can see failing. In harsh environments, you learn that **everything** can and will fail in ways you didn't expect. Equipment overheats, cables get damaged, generators run out of fuel, even the backup power systems can fail.

**In AWS terms, this translates to:**

- **Multi-AZ and Multi-Region architecture** (your primary failsafe)
- **Failover configurations** with automated health checks
- **Load balancing and autoscaling groups** to handle capacity failures
- **Database replicas** across different AZs and regions
- **No single point of failure, ever**

**Practical example:** Don't just replicate your application servers. Replicate your entire stack including:

- Load balancers across multiple subnets in different AZs
- Application servers across multiple AZs
- Database with automated failover (RDS Multi-AZ) and cross-region backup
- Backup monitoring systems (what monitors your monitoring?)
- Alternative deployment pipelines (GitLab AND GitHub Actions, for instance)

---

### Visibility is Survival - You Can't Fix What You Can't See

Dust storms, extreme heat, and unpredictable weather patterns made radio communication unstable. To better understand and adapt to these challenges, we relied on **spectrum analyzers** to monitor signal strength and interference across frequencies. Formal monitoring tools were limited, so instead, we conducted frequent manual radio checks, sometimes every hour, to ensure operational readiness and to detect degradation early. Over time, we began to recognize patterns in how environmental conditions, especially airborne dust, affected range and clarity.

**The principle:** If you can't see it failing, you can't prevent it from failing completely.

In harsh environments, problems don't announce themselves with neat error messages. Equipment degrades gradually, signal strength drops by 10% the first hour, 15% the next. Without constant monitoring, you only notice when it's completely dead and you're scrambling for backup systems.

**What this taught me about monitoring:**

1. **Measure everything, especially boring stuff** (power levels, temperature, signal quality)
2. **Trends matter more than snapshots** (gradual degradation vs. sudden failure)
3. **Context is king** (understanding why metrics change, not just that they changed)
4. **Manual verification beats automated assumption** (trust, but verify)

**In cloud terms:**

- **Use CloudWatch Logs and Metrics** for real-time alerts (but don't just set them and forget them)
- **Enable CloudTrail and AWS Config** for audit trails and change tracking
- **Implement dashboards using CloudWatch or Grafana** for live operational overviews
- **Set up synthetic monitoring** (like our hourly radio checks) to test functionality, not just availability

**Key metrics that matter:**

- Response times (not just uptime)
- Error rates (4xx/5xx responses)
- Resource utilization trends (CPU, memory, storage growth)
- Business metrics (user sign-ups, transaction volumes)
- Cost anomalies (unexpected AWS bill spikes often indicate problems)

---

### Test Your Assumptions - Everything Will Break Differently Than Expected

One thing that becomes crystal clear in challenging environments: your backup plans will be tested in ways you never imagined. Equipment that works perfectly in air-conditioned rooms behaves differently when the camp guys suddenly do maintenance on the units and everything gets shut down unexpectedly. Your primary communication method might fail at the exact moment your backup is also having issues.

**The hard truth:** Most disaster recovery plans are written by people who've never experienced a real disaster.

Deployed, we rarely had the luxury of scheduled testing, the environment tested our systems for us. Equipment failures were frequent enough that we got real-world experience with our backup procedures whether we wanted to or not. When your primary link goes down during a dust storm, you quickly learn if your contingency systems actually work under pressure.

**What we discovered:**

- Backup procedures that looked good on paper fell apart under pressure
- Manual interventions that should take "5 minutes" actually took 30
- Dependencies we didn't know existed became obvious when things failed
- Human factors (stress, fatigue, confusion) multiplied technical problems

**For cloud infrastructure, this means:**

**Chaos Engineering is Non-Negotiable:**

- Use chaos engineering tools to randomly kill services
- Conduct "game day" exercises where you simulate real outages
- If possible, do controlled test during business hours, not just maintenance windows
- Document everything that goes wrong - your assumptions, not just the solutions

**Testing Your PACE Plan:**
_PACE (Primary, Alternate, Contingency, Emergency) is a methodology for building redundant communication systems, more on this later._

- Manually fail over to each layer of your PACE architecture
- Time how long each failover takes (hint: it's always longer than you think)
- Test with multiple failures happening simultaneously
- Include human factors: what if your primary on-call engineer is unreachable?

**Real-World Scenario Testing:**
Instead of testing "database failure," test "database failure + monitoring system down + lead engineer on vacation + peak traffic load." That's when you discover if your systems are truly resilient.

---

### Security by Necessity, Not Compliance

When operating in a volatile region, security isn't a "nice to have". We followed strict access control, encryption protocols, and compartmentalization of data and systems, not because some compliance framework told us to, but because the consequences of a breach could be life-threatening.

**The mindset shift:** Security isn't about passing audits; it's about assuming everyone is trying to break in, because they probably are.

In challenging environments, you learn that security and reliability are the same thing. A compromised system is an unreliable system. A system you can't trust is a system that will fail when you need it most.

**What this means in practice:**

**Assume Breach, Plan for Compromise:**

- Design systems assuming attackers are already inside
- Compartmentalize everything so that one compromise doesn't equal total compromise
- Monitor for suspicious activity between your internal systems, not just external attacks
- Have backups that attackers can't reach

**Security that Enhances Reliability:**

- **Least privilege** reduces the blast radius of both security incidents AND human error
- **Immutable infrastructure** means you can rebuild quickly and confidently
- **Zero-trust networking** forces you to think about service-to-service communication failure modes

**Cloud implementation:**

- **Enforce least privilege** with IAM roles and policies (start with no permissions, add only what's needed)
- **Use KMS** for encryption at rest and in transit (rotate keys regularly, not just when required)
- **Separate environments** using **subnets**, **security groups**, and **network ACLs**. Or simply have multiple accounts
- **Treat Secrets Manager** like a vault, not a notepad (audit access, rotate secrets automatically)
- **Enable GuardDuty and Security Hub** for automated threat detection
- **Use AWS Systems Manager Session Manager** instead of SSH keys where possible

---

### Automation = Sanity

Manually configuring communications gear in 40°C heat while wearing body armor? Not ideal. Wherever possible, we used templates to replicate configurations, reduce human error, and save time. But more importantly, automation meant consistency - every setup was identical, every recovery procedure was the same.

**Here's the thing about manual processes:** They work great when you're calm, well-rested, and have time to think. They fall apart completely when you're stressed, tired, and need something to work RIGHT NOW.

In harsh environments, automation isn't about developer productivity, it's about reducing cognitive load when your brain is already overloaded.

**The automation principle:** If you might need to do it when you're panicking, automate it now while you're calm.

**In cloud terms, automation saves you from yourself:**

**Infrastructure as Code (Terraform, CloudFormation):**

- Version control your infrastructure like code
- Test infrastructure changes in staging before production
- Rollback capabilities when things go wrong

**CI/CD Pipelines for Safe, Repeatable Deployments:**

- Automated testing catches issues before they reach production
- Consistent deployment processes reduce human error
- Rollback mechanisms for when deployments fail
- Blue-green deployments for zero-downtime updates

---

### Think Tactically, Design Strategically - The PACE Framework

One of the most valuable frameworks I brought with me from military operations is **PACE planning**, a tactical approach to ensuring communications always stay online, no matter what. It stands for:

- **Primary**
- **Alternate**
- **Contingency**
- **Emergency**

In the field, **PACE planning was second nature**. We applied it to everything from radios to satellite links, because failure wasn't just inconvenient, it could be mission-critical. The core idea is simple but powerful: **never rely on a single method of communication**. Always plan for what happens if your primary fails and then what happens if that fails too.

Each level in the PACE plan should be **increasingly independent** of the previous one, technologically, geographically, and operationally. That layered redundancy gave us confidence in the face of chaos. And it's a mindset that translates perfectly to modern cloud infrastructure.

🪖 In the field, this might look like:

- **Primary**: Fiber internet link via local ISP
- **Alternate**: Satellite uplink
- **Contingency**: Tactical radio network
- **Emergency**: Field runner with physical message (yes, really)

Cloud equivalent:

- **Primary**: Direct Connect (DX)
- **Alternate**: VPN connection
- **Contingency**: Internet gateway
- **Emergency**: Manual failover to backup region with S3-hosted static backup

---

## Putting It All Together: Building Systems That Actually Work

The lessons above aren't just theoretical, they're practical frameworks that can transform how you approach cloud infrastructure. But here's the key: they only work if you implement them as a cohesive system, not as isolated best practices.

### The Desert Mindset in Practice

**Start with the assumption that everything will fail**, not might fail, will fail. Your job isn't to prevent failure; it's to ensure that when failures happen, they don't cascade into disasters.

**Plan for the compound failures:** In Mali, we learned that bad things come in clusters. The power fails during a dust storm while the primary communications link is already down for maintenance. In cloud terms, this means your database fails during a traffic spike while your monitoring system is having its own issues.

**Test everything, especially your assumptions:** That backup database you've never actually restored from? Those runbooks that haven't been used in six months? That disaster recovery plan that looks great in PowerPoint? Test them. Break them. Fix them. Repeat.

### Making It Real: A Practical Implementation Path

**Assessment**

- Audit your current systems for single points of failure
- Identify what you can't afford to lose
- Map out your actual (not theoretical) recovery procedures

**Quick Wins**

- Implement basic CloudWatch monitoring with real alerts
- Set up automated backups with restore testing
- Document your current architecture (you can't improve what you don't understand)

**PACE Planning**

- Design your PACE architecture for critical services
- Implement automated failover for your primary systems
- Start regular "game day" failure testing

**Automation & Security**

- Move to Infrastructure as Code for all critical components
- Implement least-privilege security across your systems
- Set up automated testing and deployment pipelines

**Ongoing: The Never-Ending Journey**

- Regular failure testing (monthly, not yearly)
- Continuous monitoring and alerting improvements
- Keep learning, both from your failures and others

### Final Thoughts

You don't need to be deployed to a desert to understand that **reliability is earned, not assumed**. Whether you're maintaining connectivity for a military operation or keeping a cloud-based service online for customers, the same mindset applies:

**The core principles are simple:**

- **Plan for failure** (because it's not if, it's when)
- **Observe everything** (you can't fix what you can't see)
- **Automate where you can** (humans make mistakes when stressed)
- **Secure your communications** (compromised systems are unreliable systems)
- **Test your assumptions** (especially the comfortable ones)

The difference between systems that work under pressure and systems that collapse isn't complexity, it's preparation. The time to build resilient systems isn't when things are failing; it's when they're working fine and you have the mental bandwidth to think strategically.

Your users might never know that you built systems designed to survive in a desert. But when everything else is falling apart around them, they'll notice that your services just keep working.

And that's when you'll know you got it right.
