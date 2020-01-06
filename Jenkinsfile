pipeline {
    agent none
    stages {
        stage('checkout') {
            agent {
                label 'slave-1'
            }
            steps {
                git([url: 'https://github.com/autotaker/negainoido-ap-server.git', branch: 'master'])
            }
        }
        stage('build') {
            agent {
                docker {
                    image 'node'
                    label 'slave-1'
                    args '-e HOME=/home/jenkins -v /home/jenkins:/home/jenkins'
                }
            }
            steps {
                dir('frontend') {
                    sh 'npm install --no-audit'
                    sh 'npm run build'
                }
            }
        }
        
        stage('deploy') {
            agent {
                label 'slave-1'
            }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-user', 
                                 keyFileVariable: 'identity', 
                                 passphraseVariable: '', 
                                 usernameVariable: 'userName')]) {
                    sh "scp -i ${identity} -r frontend/build/* ${userName}@10.146.0.10:/var/www/html/"
                }
            }
        }
    }
}

