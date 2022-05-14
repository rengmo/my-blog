from .a import a_function

def b_function():
    a_result = a_function()
    if a_result:
        return 'a_function返回的结果为真'
    else:
        raise Exception('a_function返回的结果为假')
