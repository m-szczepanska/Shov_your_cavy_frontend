from sys import argv
import os

script, pig_image = argv

print('print', pig_image)

if os.path.exists(f'/Users/marsza/workspace/media/{pig_image}'):
  print(f'/Users/marsza/workspace/media/{pig_image}')
else:
  print("The file does not exist")
