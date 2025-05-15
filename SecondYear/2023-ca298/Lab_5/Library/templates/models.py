from django.db import models

class MyModel(models.Model):

   CATEGORY_CHOICES = [
      ('horror', 'Horror'),
      ('scifi', 'Science Fiction'),
      ('mystery', 'Mystery'),
      ('fantasy', 'Fantasy'),
      ('crime', 'Crime'),
        # Add more categories as needed
   ]

   id = models.AutoField(primary_key=True)
   year = models.IntegerField()
   author = models.CharField(max_length=25)
   price = models.DecimalField(max_digits=5, decimal_places=2)
   title = models.CharField(max_length=50)
   synopsis = models.TextField()
   category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='uncategorized')
   
   
