#!/bin/sh

#
# 1. uncomment all three of the commands below
# 2. git commit
# 3. git push
# 4. visit the CI/CD section of *YOUR* repo on GitLab
# 5. find the output of running this script and note your own
#    personal hash; you will need it to complete the rest of
#    this task
#

echo "user is $GITLAB_USER_LOGIN"
echo -n "hash is... "
/var/script/hash-args "$GITLAB_USER_LOGIN"

echo
echo "This is a test:" $(date)
