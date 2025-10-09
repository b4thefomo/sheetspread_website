# SheetSpread Writing Style Guide

This guide outlines the writing style and approach for creating engaging, helpful content for the SheetSpread blog.

## Overall Writing Philosophy

SheetSpread content should feel like **a knowledgeable friend explaining tech** - professional but approachable, informative but not overwhelming. We're here to help people work smarter with their data, not impress them with jargon.

**Key Principles:**
- **Friendly, not stuffy** - Write like you're explaining to a colleague over coffee
- **Clear, not complex** - Simple language beats fancy words every time
- **Practical, not theoretical** - Focus on real solutions people can use today
- **Encouraging, not condescending** - Everyone starts somewhere with tech

## Writing Style Standards

### 1. Tone & Voice

**What We Sound Like:**
- **Conversational**: Use contractions (you're, it's, we'll)
- **Encouraging**: Celebrate small wins and progress
- **Direct**: Get to the point quickly, respect reader's time
- **Helpful**: Always thinking "how can I make this easier to understand?"

**What We Avoid:**
- Overly formal business speak ("leverage," "utilize," "synergize")
- Talking down to readers ("obviously," "simply," "just")
- Marketing fluff without substance
- Assuming expert-level knowledge

**Examples:**
- ❌ "Leverage SheetSpread to optimize your data workflows"
- ✅ "Use SheetSpread to save hours on your weekly reports"

- ❌ "Simply configure the OAuth2 authentication protocol"
- ✅ "Connect to Salesforce (we'll walk you through it step by step)"

### 2. Article Structure

#### **Intro Paragraph**
Hook readers immediately with the problem they're facing:
```
"Tired of copy-pasting Salesforce data into Google Sheets every Monday morning?
Let's fix that in the next 5 minutes."
```

#### **Body Content**
- **Short paragraphs** (2-4 sentences max)
- **Descriptive subheadings** that tell the story
- **Bulleted lists** for easy scanning
- **Real examples** that readers can relate to
- **Occasional personal touches** ("Here's my favorite trick...")

#### **Conclusion**
End with encouragement and a clear next step:
```
"That's it! You've just automated something that used to eat up hours of your week.
Ready to take it further? Check out our guide on..."
```

### 3. Headline Writing

**Format**: Make it benefit-focused and specific

**Good Headline Patterns:**
- "How to [Achieve Result] in [Specific Time]"
  - "How to Connect Salesforce to Google Sheets in 5 Minutes"

- "[Number] Ways to [Solve Problem]"
  - "5 Ways Sales Teams Use SheetSpread to Hit Their Numbers"

- "Stop [Pain Point]: [Better Solution]"
  - "Stop Exporting Manually: SheetSpread vs Manual Data Pulls"

**Avoid:**
- Clickbait ("This One Weird Trick...")
- Vague promises ("Transform Your Business")
- Overly technical jargon in headlines

### 4. Content Guidelines

#### **Language Style**
- **Use "you" and "we"** - Make it personal
- **Active voice** - "SheetSpread automates your reports" not "Reports are automated by SheetSpread"
- **Contractions** - "You're" instead of "you are"
- **Simple words** - "use" instead of "utilize", "help" instead of "facilitate"

#### **Technical Content**
- **Explain before using jargon** - First mention: "SOQL (Salesforce's query language)"
- **Use analogies** - "Think of SOQL like asking Salesforce specific questions"
- **Screenshots help** - But don't rely on them alone
- **Step numbers** - For tutorials, clear numbered steps

#### **Examples & Use Cases**
Always include concrete examples:
```
Instead of: "SheetSpread helps with reporting"
Use: "Imagine your weekly sales report updates automatically every Monday at 8am,
ready when you grab your morning coffee. That's SheetSpread."
```

### 5. Typography and Reading Experience

#### **Font Selection**
We use **Spectral** (serif font) for all blog content to create a friendly, readable experience:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Spectral:wght@300;400;600;700&display=swap" rel="stylesheet">
```

**Font Weights:**
- **300 (Light)**: For subtle emphasis or captions
- **400 (Regular)**: Body text, paragraphs
- **600 (Semi-Bold)**: Subheadings, important callouts
- **700 (Bold)**: Main headings, strong emphasis

**Implementation:**
```css
body {
  font-family: 'Spectral', Georgia, serif;
}

/* Headings */
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.3;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* Body text */
p {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

/* Emphasis */
strong {
  font-weight: 600;
}
```

#### **Readability Standards**
- **Line length**: 60-80 characters per line
- **Line height**: 1.7 for body text (comfortable reading)
- **Font size**: Minimum 18px (1.125rem) for body text
- **Paragraph spacing**: 1.5rem between paragraphs

#### **Color Scheme**
```css
/* Keep terminal aesthetic for UI, friendly for content */
.article-content {
  background: #ffffff;  /* Clean white for reading */
  color: #1a1a1a;       /* Soft black, easier on eyes */
}

.article-content a {
  color: #FF6600;       /* SheetSpread orange for links */
  text-decoration: underline;
}

.article-content code {
  background: #f8f9fa;  /* Light gray for inline code */
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}
```

### 6. Content Structure Templates

#### **Tutorial Post Template**
```markdown
# [Friendly, Benefit-Focused Title]

[Hook paragraph - the problem this solves]

## Why You Need This

[2-3 paragraphs explaining the pain point and benefit]

## What You'll Need

- Requirement 1
- Requirement 2
- Requirement 3

## Step-by-Step Guide

### Step 1: [Action Verb + What They'll Do]
[Clear instructions with context]

### Step 2: [Next Action]
[More instructions, screenshots if needed]

[Continue for all steps...]

## Tips & Troubleshooting

[Common issues and how to fix them]

## What's Next?

[Encouragement + link to related content]
```

#### **Use Case Post Template**
```markdown
# [Number] Ways [Audience] Use SheetSpread to [Benefit]

[Opening: Set the scene - who this is for and what they'll learn]

## 1. [Specific Use Case Name]

**The Problem:** [What they're struggling with]
**The Solution:** [How SheetSpread helps]
**The Result:** [Time saved, problem solved]

[Real example or quote if possible]

## 2. [Next Use Case]
[Repeat structure...]

## Your Turn

[Encouraging conclusion + CTA]
```

### 7. Special Content Elements

#### **Callout Boxes**
Use sparingly for important tips or warnings:

```html
<div style="background: #fff3cd; border-left: 4px solid #FF6600; padding: 1rem; margin: 2rem 0;">
  <strong>💡 Pro Tip:</strong> This is a helpful insider trick that will save you time.
</div>
```

#### **Code Examples**
When showing queries or formulas, add context:

```markdown
Here's a SOQL query that grabs your leads from this week:

```soql
SELECT Id, FirstName, LastName, Company, Email
FROM Lead
WHERE CreatedDate = THIS_WEEK
```

This asks Salesforce: "Show me all leads created in the last 7 days."
```

#### **Quiz/Assessment Blocks**
Engage readers with self-assessment:

```html
<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            border: 3px solid #FF6600;
            border-radius: 12px;
            padding: 28px;
            margin: 32px 0;">
  <h4 style="color: #FF6600;">🤔 Quick Check: Do You Need This?</h4>
  <ul style="color: #FEFCE8;">
    <li>Question 1?</li>
    <li>Question 2?</li>
  </ul>
  <p style="color: #FEFCE8;"><strong>If you answered yes to 2+</strong>, keep reading...</p>
</div>
```

### 8. SEO & Links

#### **External Links**
Link to authoritative sources naturally:
- Official documentation (Google, Salesforce)
- Relevant learning resources (Trailhead)
- Industry standards (OAuth2.net)

Always use descriptive anchor text:
- ❌ "Click here for more info"
- ✅ "Check out Google's Sheets API documentation"

#### **Internal Links**
Cross-reference related content:
```markdown
If you're new to SOQL, our [SOQL for Beginners guide](/posts/post-3)
walks you through the basics step by step.
```

### 9. Content Quality Checklist

Before publishing, verify:

**Readability:**
- [ ] Uses Spectral font for all body text
- [ ] Font size minimum 18px for body content
- [ ] Line height 1.7 for comfortable reading
- [ ] Paragraphs are 2-4 sentences max
- [ ] Subheadings every 2-3 paragraphs
- [ ] Bulleted lists for scannable content

**Tone:**
- [ ] Sounds friendly and encouraging
- [ ] No condescending language ("simply," "obviously")
- [ ] Uses "you" and "we" appropriately
- [ ] Contractions used naturally

**Helpfulness:**
- [ ] Solves a real problem
- [ ] Includes concrete examples
- [ ] Has clear next steps
- [ ] Links to related resources

**Technical Accuracy:**
- [ ] All instructions tested and working
- [ ] Code examples are correct
- [ ] Screenshots are current
- [ ] Links all work

## Sample Opening Paragraphs

**Great Examples:**

```
"Let's be honest - manually exporting Salesforce data every week is nobody's
idea of a good time. You've got better things to do than copy-paste cells
for two hours every Monday. Let's automate that."
```

```
"Here's a question I hear a lot: 'Can I really set up a Salesforce
connection without IT help?' Short answer: Yes. Long answer: Yes, and
here's exactly how in the next 5 minutes."
```

```
"You know that moment when you finish a report, then realize the data's
already outdated? Yeah, we've all been there. Time to fix that for good."
```

## Success Metrics

Good SheetSpread content should:
- **Feel helpful, not salesy** - Readers trust we're here to help
- **Be actionable** - They can do something immediately after reading
- **Build confidence** - "I can do this!" not "This is complicated"
- **Save time** - Respect reader's time with clear, scannable content
- **Use readable fonts** - Spectral ensures comfortable long-form reading

---

**Remember:** We're not writing documentation or corporate announcements. We're helping real people solve real problems with their data. Keep it friendly, keep it clear, keep it useful.
