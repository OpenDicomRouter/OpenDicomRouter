import glob 
import pydicom

def get_file_paths(directory):
    """
    Get file paths of DICOM files in the given directory.
    :param directory: Path to the directory containing DICOM files
    :return: A list of file paths
    """
    return glob.glob(directory + '*.dcm')


def get_dicom_data(file_name):
    """
    Read DICOM data from the given file.
    :param file_name: Path to the DICOM file
    :return: A pydicom.dataset.FileDataset object containing the DICOM data
    """
    return pydicom.dcmread(file_name)


def get_dicomn_data(file_names):
    """
    Read and display DICOM data from the given file paths.
    :param file_names: A list of file paths to DICOM files
    """
    for fn in file_names:
        print("-----------------------------")
        ds = pydicom.dcmread(fn)
        elem = ds['PatientName']
        VR = elem.VR
        value = elem.value
        print(ds)
        print(fn)
        print(f" VR: {VR}, Value: {value}")
        print("-----------------------------")


if __name__ == "__main__":
    data_path = "test_files/"
    files = get_file_paths(data_path)
    get_dicomn_data(files)
    print(files)