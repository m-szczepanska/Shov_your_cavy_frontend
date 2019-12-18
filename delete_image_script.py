from sys import argv
import os

script, pig_image = argv

print('print', pig_image)

if os.path.exists(f'../{pig_image}'):
  os.remove(f'../{pig_image}')
else:
  print("The file does not exist")
