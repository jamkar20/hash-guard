use anyhow::Result;
use md5::{Digest as Md5Digest, Md5};
use sha1::{Digest as Sha1Digest, Sha1};
use sha2::{Digest as Sha2Digest, Sha256};
use std::fs::File;
use std::io::Read;

pub fn hash_file(path: &str) -> Result<(String, String, String)> {
    let mut file = File::open(path)?;
    let mut hasher_sha2 = Sha256::new();
    let mut hasher_sha1 = Sha1::new();
    let mut hasher_md5 = Md5::new();
    let mut buffer = [0u8; 128 * 1024];

    loop {
        let n = file.read(&mut buffer)?;
        if n == 0 {
            break;
        }
        hasher_sha2.update(&buffer[..n]);
        hasher_sha1.update(&buffer[..n]);
        hasher_md5.update(&buffer[..n]);
    }

    let hash_sha2 = format!("{:x}", hasher_sha2.finalize());
    let hash_sha1 = format!("{:x}", hasher_sha1.finalize());
    let hash_md5 = format!("{:x}", hasher_md5.finalize());

    Ok((hash_sha2, hash_sha1, hash_md5))
}
