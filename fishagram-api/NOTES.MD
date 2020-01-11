# Fishagram Notes
    * Functionality
        - Single page app
        - Home screen will show feed with posts
        - Have to be logged in to post. 
        - Will be able to sort by most liked(implement date filter?)

# Models

    * User
        - has_many Posts
        - username 
        - email
        - password
    
    * Post
        - belongs_to User
        - has_many Comments
        - picture
        - description
        - weight(optional)
        - length(optional)
        - lure used
        - likes
     * Like
        - belongs_to User
        - belongs_to Post

# Authentication

    * Bcrypt
        - Validate username and email for presence and uniqueness
        - Password Confirmation