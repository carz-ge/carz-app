import {ProductPackage} from '../../graphql/operations';
import {PackageCard} from '../ProductPackage/package-card';
import React from 'react';
import ShowAllPackagesButton from './show-all-packages-botton';

const MAX_PACKAGES_TO_SHOW = 2;

interface AvailablePackagesProps {
  packages: ProductPackage[];
  selectPackage: (packageId: string | null) => void;
  selectedPackageId: string | null;
}

export default function AvailablePackages({
  packages,
  selectPackage,
  selectedPackageId,
}: AvailablePackagesProps) {
  const shouldShowAllPackages = packages.length <= MAX_PACKAGES_TO_SHOW;
  const packagesToShow = shouldShowAllPackages
    ? packages
    : packages.slice(0, MAX_PACKAGES_TO_SHOW);

  return (
    <>
      {packagesToShow.map((productPackage: ProductPackage) => (
        <PackageCard
          key={productPackage.id}
          productPackage={productPackage}
          onPackageSelected={selectPackage}
          isSelected={productPackage.id === selectedPackageId}
        />
      ))}
      {!shouldShowAllPackages && (
        <ShowAllPackagesButton
          packages={packages}
          selectPackage={selectPackage}
          selectedPackageId={selectedPackageId}
        />
      )}
    </>
  );
}
