import cv2
import numpy as np
import io
import sys

def sift_detector(file):
    in_memory_file = io.BytesIO()
    file.save(in_memory_file)
    data = np.fromstring(in_memory_file.getvalue(), dtype=np.uint8)
    color_image_flag = 0 # 이거 0 해줘야 되는거 아닌가?
    img = cv2.imdecode(data, color_image_flag)

    mapping_data = {0:"김대현", 1 : "이동현", 2 : "김성헌"}
    result_arr = {}
    for i in range(0,3):
        image1 = img
        image2 = cv2.imread(sys.argv[1],0)#('./data/test'+str(i)+'.jpg', 0)
        sift = cv2.xfeatures2d.SIFT_create()
        keypoints_1, descriptors_1 = sift.detectAndCompute(image1, None)
        keypoints_2, descriptors_2 = sift.detectAndCompute(image2, None)

        FLANN_INDEX_KDTREE = 0
        index_params = dict(algorithm = FLANN_INDEX_KDTREE, trees = 3)
        search_params = dict(checks = 100)

        flann = cv2.FlannBasedMatcher(index_params, search_params)

        matches = flann.knnMatch(descriptors_1, descriptors_2, k=2)

        good_matches = []
        matchesMask = [[0,0] for i in range(len(matches))]
        for i,(m,n) in enumerate(matches):
            if m.distance < 0.7*n.distance:
                matchesMask[i]=[1,0]
        draw_params = dict(matchColor = (0,255,0),
                       singlePointColor = (255,0,0),
                       matchesMask = matchesMask,
                       flags = 0)
        img3 = cv2.drawMatchesKnn(image1,keypoints_1,image2,keypoints_2,matches,None,**draw_params)
        for m,n in matches:
            if m.distance < 0.7 * n.distance:
                good_matches.append(m)
        print(len(good_matches))
        result_arr[i] = len(good_matches)


    #
    max_num = -1
    match_index = -1
    i = 0
    values = result_arr.values();
    for value in values:
        i += 1
        if max_num < value :
            max_num = value
        if value == max_num : 
            match_index = i

    ret_str = mapping_data[match_index]

    if max_num > 50:
        print(ret_str);
        return "True"
    else:
        print("doesn't match");
        return "False"
