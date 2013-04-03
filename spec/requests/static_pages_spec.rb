require 'spec_helper'

describe "StaticPages" do
  describe "Help Pages" do
    it "should have h1 'help'" do
      visit '/static_pages/help'
      page.should have_selector('h1',:text=>"Help")
    end
     it "should have title'help'" do
        visit '/static_pages/help'
        page.should have_selector('title',:text=>"Ruby on Rails Tutorial Sample App | Help")
      end
  end
  describe "Home Pages" do
    it "should have the h1 'Sample App'" do
      visit '/static_pages/home'
      page.should have_selector('h1',:text => "Sample App")
    end
    it "should have the title'Home'" do
      visit '/static_pages/home'
      page.should_not have_selector('title',:text => "| Home")
    end
  end
  describe "About Pages" do
    it "should have h1'about us'" do
      visit '/static_pages/about'
      page.should have_selector('h1',:text=>"About Us")
    end
    it "should have title'about us'" do
      visit '/static_pages/about'
      page.should have_selector('title',:text =>"Ruby on Rails Tutorial Sample App | About Us")
    end
  end
  describe "Contact Pages" do
    it "should have h1 content 'Contact Us'" do
      visit '/static_pages/contact'
      page.should have_selector('title',:text=>"Ruby on Rails Tutorial Sample App | Contact Us")
    end
  end
end
