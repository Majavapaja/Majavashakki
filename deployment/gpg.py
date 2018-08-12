from subprocess import Popen, PIPE

def decrypt_file(filename):
  process = Popen(["gpg", "--decrypt", filename], stdin=PIPE, stdout=PIPE, stderr=PIPE)
  stdout, _ = process.communicate()
  return stdout
