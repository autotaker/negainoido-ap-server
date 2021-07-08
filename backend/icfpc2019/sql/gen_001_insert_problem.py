url = "https://storage.googleapis.com/negainoido-icfpc-platform-storage/icfpc2019/problems/"
with open("../../tmp/part-1-initial/part-1-legend.txt") as f:
    print("insert into problem(name, description, url) values")
    for line in f.readlines():
        prob, desc = line.strip().split(" - ")
        print("('{}', '{}', '{}'),".format(prob, desc, url + prob + ".desc"))
    print(
        """
    on duplicate key update
      description = values(description),
      url = values(url)
    """
    )
