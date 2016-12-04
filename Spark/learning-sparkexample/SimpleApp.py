# Initialization Spark in Python
from pyspark import SparkContext

# Setting Spark work
# conf = SparkConf().setMaster("local").setAppName("Hello World APP")
# sc = SparkContext(conf = conf)
sc = SparkContext("local", "Hello World APP")

# Should be some file on your system
logFile = "/usr/apache/spark-2.0.2-bin-hadoop2.7/README.md"
logData = sc.textFile(logFile).cache()

numAs = logData.filter(lambda s: 'a' in s).count()
numBs = logData.filter(lambda s: 'b' in s).count()

print("Lines with a: %i, lines with b: %i" % (numAs, numBs))

sc.stop()
