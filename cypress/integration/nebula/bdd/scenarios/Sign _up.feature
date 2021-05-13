Feature: Sign up

As a user I want to sign up with FT so that I can fund my invoices

@focus:
Scenario: Open sign up page

Given I open "sign-up" page
Then I see "Sign Up" in the title
Then I see "#Business Email" field
And I type "admin@ft.com" in "#Business Email"
Then I make a screeshot