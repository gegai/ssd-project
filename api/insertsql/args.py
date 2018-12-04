def multiple(tag,*args):
    i=0
    print args[0]
    for value in args:
        while i<tag:
            print " args:",value
            i=i+1
            break


def multiple2(**args):
    for key in args:
        print key+":"+bytes(args[key])
if __name__=='__main__':
    multiple(2,1,'a',True)
    multiple2(name='Amy',age=12,single=True)