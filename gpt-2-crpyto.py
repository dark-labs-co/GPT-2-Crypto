#!./usr/bin/python3
import sys, json
import gpt_2_simple as gpt2


def read_in():
    lines = sys.stdin.readlines()

    return json.loads(lines[0])

def ml_func():
    lines = read_in()
    binary_input = str(lines)
    sess = gpt2.start_tf_sess()
    gpt2.load_gpt2(sess)

    gpt2.generate(sess,
                  length=20,
                  temperature=0.7,
                  prefix=binary_input,
                  nsamples=1
                  )

def main():
    run = ml_func()
    print (run)

if __name__ == '__main__':
    main()