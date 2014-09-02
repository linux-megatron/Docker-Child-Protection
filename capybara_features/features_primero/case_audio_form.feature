# JIRA PRIMERO-96
# JIRA PRIMERO-353
# JIRA PRIMERO-363

@javascript @primero
Feature: Case Audio Form
  As a Social Worker, I want to upload photos and audio

  Scenario: I upload a photo with the incorrect format
    Given I am logged in as a social worker with username "primero" and password "primero"
    When I access "cases page"
    Then I press the "New Case" button
    And I press the "Photos and Audio" button
    And I attach a photo "capybara_features/resources/textfile.txt"
    And I press "Save"
    Then I should see "Please upload a valid photo file (jpg or png) for this case record" on the page

  Scenario: I upload a audio file with the incorrect format
    Given I am logged in as a social worker with username "primero" and password "primero"
    When I access "cases page"
    Then I press the "New Case" button
    And I press the "Photos and Audio" button
    And I attach an audio file "capybara_features/resources/textfile.txt"
    And I press "Save"
    Then I should see "Please upload a valid audio file (amr or mp3) for this case record" on the page

  Scenario: I upload a photo file with the incorrect size
    Given I am logged in as a social worker with username "primero" and password "primero"
    When I access "cases page"
    Then I press the "New Case" button
    And I press the "Photos and Audio" button
    And I attach a photo "capybara_features/resources/huge.jpg"
    And I press "Save"
    Then I should see "Please upload a file smaller than 10mb" on the page

  Scenario: I upload a audio file with the incorrect size
    Given I am logged in as a social worker with username "primero" and password "primero"
    When I access "cases page"
    Then I press the "New Case" button
    And I press the "Photos and Audio" button
    And I attach an audio file "capybara_features/resources/huge.mp3"
    And I press "Save"
    Then I should see "Please upload a file smaller than 10mb" on the page

  Scenario: I upload a photo file with the correct size and format
    Given I am logged in as a social worker with username "primero" and password "primero"
    When I access "cases page"
    Then I press the "New Case" button
    And I press the "Photos and Audio" button
    And I attach a photo "capybara_features/resources/jorge.jpg"
    And I press "Save"
    Then I should see "Case record successfully created" on the page

  Scenario: I upload a audio file with the correct size and format
    Given I am logged in as a social worker with username "primero" and password "primero"
    When I access "cases page"
    Then I press the "New Case" button
    And I press the "Photos and Audio" button
    And I attach an audio file "capybara_features/resources/sample.mp3"
    And I press "Save"
    Then I should see "Case record successfully created" on the page

  Scenario: Uploading multiple images
    Given I am logged in as a social worker with username "primero" and password "primero"
    When I access "cases page"
    Then I press the "New Case" button
    When I fill in "Name" with "John"
    And I click the "Photos and Audio" link
    And I attach the following photos:
      |capybara_features/resources/jorge.jpg|
      |capybara_features/resources/jeff.png |
    And I press "Save"
    Then I should see "Case record successfully created"

    When I click the "Photos and Audio" link
    Then I should see "2" thumbnails
    When I follow "Edit"
    And I click the "Photos and Audio" link
    Then I should see "2" thumbnails

  Scenario: I delete the audio file
    Given I am logged in as a social worker with username "primero" and password "primero"
    And I access "cases page"
    And I press the "New Case" button
    And I press the "Photos and Audio" button
    And I attach an audio file "capybara_features/resources/sample.mp3"
    And I press "Save"
    When I press the "Edit" button
    And I press the "Photos and Audio" button
    And I check the "Delete audio?" field
    And I press "Save"
    Then I should see "Case was successfully updated"
    And I should not see "Delete audio?"
    And I should not see "Recorded Audio"
    And I should not see "Download"
