// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title CertificateVerification
 * @dev A smart contract for storing and verifying academic certificates on Ethereum blockchain
 * @notice Designed for Certificate Verifier academic credential verification platform
 * @author Vishal Barai - Certificate Verifier
 */
contract CertificateVerification {
    
    // ============================================
    // STATE VARIABLES
    // ============================================
    
    address public admin;
    uint256 public totalCertificates;
    
    // ============================================
    // STRUCTS
    // ============================================
    
    struct Certificate {
        string certificateNumber;    // Unique certificate serial number
        string studentName;
        string enrollmentNumber;
        string course;
        string institution;
        uint256 issueYear;
        uint256 issueDate;
        string certificateHash;
        string ipfsHash;
        address issuerAddress;
        bool exists;
    }
    
    struct Student {
        string name;
        string enrollmentNumber;
        string email;
        string mobileNumber;
        string department;
        string batchYear;
        string password;
        bool isRegistered;
        uint256 registrationDate;
    }
    
    // ============================================
    // MAPPINGS
    // ============================================
    
    mapping(string => Certificate) private certificates; // key = certificateHash
    mapping(string => Student) private students;         // key = enrollmentNumber
    mapping(string => string[]) private studentCertificates;
    mapping(string => bool) private certificateNumberExists; // prevent duplicate numbers
    
    string[] private allCertificateHashes;
    string[] private allEnrollmentNumbers;
    
    // ============================================
    // EVENTS
    // ============================================
    
    event CertificateIssued(
        string indexed certificateHash,
        string certificateNumber,
        string studentName,
        string enrollmentNumber,
        string course,
        uint256 issueDate,
        address issuerAddress
    );
    
    event StudentRegistered(
        string indexed enrollmentNumber,
        string studentName,
        uint256 registrationDate
    );
    
    event CertificateVerified(
        string indexed certificateHash,
        bool isValid,
        uint256 verificationTime
    );
    
    // ============================================
    // MODIFIERS
    // ============================================
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Access denied: Only admin can perform this action");
        _;
    }
    
    // ============================================
    // CONSTRUCTOR
    // ============================================
    
    constructor() {
        admin = msg.sender;
        totalCertificates = 0;
    }
    
    // ============================================
    // ADMIN FUNCTIONS
    // ============================================
    
    function registerStudent(
        string memory _enrollmentNumber,
        string memory _name,
        string memory _email,
        string memory _mobileNumber,
        string memory _department,
        string memory _batchYear,
        string memory _password
    ) public onlyAdmin {
        require(!students[_enrollmentNumber].isRegistered, "Student already registered");
        require(bytes(_enrollmentNumber).length > 0, "Enrollment number cannot be empty");
        require(bytes(_name).length > 0, "Student name cannot be empty");
        
        students[_enrollmentNumber] = Student({
            name: _name,
            enrollmentNumber: _enrollmentNumber,
            email: _email,
            mobileNumber: _mobileNumber,
            department: _department,
            batchYear: _batchYear,
            password: _password,
            isRegistered: true,
            registrationDate: block.timestamp
        });
        
        allEnrollmentNumbers.push(_enrollmentNumber);
        
        emit StudentRegistered(_enrollmentNumber, _name, block.timestamp);
    }
    
    function issueCertificate(
        string memory _certificateHash,
        string memory _certificateNumber,
        string memory _enrollmentNumber,
        string memory _studentName,
        string memory _course,
        string memory _institution,
        uint256 _issueYear,
        string memory _ipfsHash
    ) public onlyAdmin {
        require(bytes(_certificateHash).length > 0, "Certificate hash cannot be empty");
        require(bytes(_certificateNumber).length > 0, "Certificate number cannot be empty");
        require(!certificates[_certificateHash].exists, "Certificate with this hash already exists");
        require(!certificateNumberExists[_certificateNumber], "Certificate number already exists");
        require(bytes(_enrollmentNumber).length > 0, "Enrollment number cannot be empty");
        require(students[_enrollmentNumber].isRegistered, "Student not registered");
        require(bytes(_studentName).length > 0, "Student name cannot be empty");
        require(bytes(_course).length > 0, "Course cannot be empty");
        require(bytes(_institution).length > 0, "Institution cannot be empty");
        
        certificates[_certificateHash] = Certificate({
            certificateNumber: _certificateNumber,
            studentName: _studentName,
            enrollmentNumber: _enrollmentNumber,
            course: _course,
            institution: _institution,
            issueYear: _issueYear,
            issueDate: block.timestamp,
            certificateHash: _certificateHash,
            ipfsHash: _ipfsHash,
            issuerAddress: msg.sender,
            exists: true
        });
        
        certificateNumberExists[_certificateNumber] = true;
        studentCertificates[_enrollmentNumber].push(_certificateHash);
        allCertificateHashes.push(_certificateHash);
        totalCertificates++;
        
        emit CertificateIssued(
            _certificateHash,
            _certificateNumber,
            _studentName,
            _enrollmentNumber,
            _course,
            block.timestamp,
            msg.sender
        );
    }
    
    // ============================================
    // VERIFICATION FUNCTIONS
    // ============================================
    
    function verifyCertificate(string memory _certificateHash) public returns (bool) {
        bool isValid = certificates[_certificateHash].exists;
        emit CertificateVerified(_certificateHash, isValid, block.timestamp);
        return isValid;
    }
    
    function verifyCertificateView(string memory _certificateHash) public view returns (bool) {
        return certificates[_certificateHash].exists;
    }
    
    // ============================================
    // GETTER FUNCTIONS
    // ============================================
    
    function getCertificate(string memory _certificateHash) public view returns (
        string memory certificateNumber,
        string memory studentName,
        string memory enrollmentNumber,
        string memory course,
        string memory institution,
        uint256 issueYear,
        uint256 issueDate,
        string memory ipfsHash,
        address issuerAddress
    ) {
        require(certificates[_certificateHash].exists, "Certificate does not exist");
        
        Certificate memory cert = certificates[_certificateHash];
        return (
            cert.certificateNumber,
            cert.studentName,
            cert.enrollmentNumber,
            cert.course,
            cert.institution,
            cert.issueYear,
            cert.issueDate,
            cert.ipfsHash,
            cert.issuerAddress
        );
    }
    
    function getStudent(string memory _enrollmentNumber) public view returns (
        string memory name,
        string memory email,
        string memory mobileNumber,
        string memory department,
        string memory batchYear,
        bool isRegistered,
        uint256 registrationDate
    ) {
        Student memory student = students[_enrollmentNumber];
        return (
            student.name,
            student.email,
            student.mobileNumber,
            student.department,
            student.batchYear,
            student.isRegistered,
            student.registrationDate
        );
    }
    
    function verifyStudentLogin(
        string memory _enrollmentNumber,
        string memory _password
    ) public view returns (bool) {
        Student memory student = students[_enrollmentNumber];
        if (!student.isRegistered) return false;
        return keccak256(bytes(student.password)) == keccak256(bytes(_password));
    }
    
    function getStudentCertificates(string memory _enrollmentNumber) public view returns (string[] memory) {
        return studentCertificates[_enrollmentNumber];
    }
    
    function getAllCertificateHashes() public view onlyAdmin returns (string[] memory) {
        return allCertificateHashes;
    }
    
    function getAllEnrollmentNumbers() public view onlyAdmin returns (string[] memory) {
        return allEnrollmentNumbers;
    }
    
    function getTotalCertificates() public view returns (uint256) {
        return totalCertificates;
    }
    
    function getAdmin() public view returns (address) {
        return admin;
    }
    
    function isAdmin() public view returns (bool) {
        return msg.sender == admin;
    }

    function isCertificateNumberExists(string memory _certificateNumber) public view returns (bool) {
        return certificateNumberExists[_certificateNumber];
    }
}